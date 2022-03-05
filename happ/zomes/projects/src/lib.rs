use hdk::prelude::*;
use holo_hash::{AgentPubKeyB64, HeaderHashB64};

pub mod project;

use hdk_crud::{
    retrieval::{get_latest_for_entry::GetLatestEntry, fetch_links::FetchLinks},
    signals::{create_receive_signal_cap_grant, ActionSignal},
};
use project::{
    edge::crud::Edge,
    entry_point::crud::EntryPoint,
    goal::crud::{ArchiveGoalFullySignal, Goal, GoalWithEdgeSignal},
    goal_comment::crud::GoalComment,
    goal_member::crud::GoalMember,
    goal_vote::crud::GoalVote,
    member::entry::{join_project_during_init, Member, MemberSignal, MEMBER_PATH},
    project_meta::crud::ProjectMeta,
};

#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    // authorize receive_signal
    // not the issue, takes about 2 ms
    create_receive_signal_cap_grant()?;

    // add our member entry to the project
    join_project_during_init()?;

    Ok(InitCallbackResult::Pass)
}

entry_defs!(
    PathEntry::entry_def(),
    Edge::entry_def(),
    EntryPoint::entry_def(),
    Goal::entry_def(),
    GoalComment::entry_def(),
    GoalMember::entry_def(),
    GoalVote::entry_def(),
    Member::entry_def(),
    ProjectMeta::entry_def()
);

/*
SIGNALS
*/

#[derive(Debug, Serialize, Deserialize, SerializedBytes)]
// untagged because the useful tagging is done internally on the *Signal objects
#[serde(tag = "signalType", content = "data")]
pub enum SignalType {
    Edge(ActionSignal<Edge>),
    EntryPoint(ActionSignal<EntryPoint>),
    Goal(ActionSignal<Goal>),
    // custom signal type for a goal_with_edge
    // this is because it's important to the UI to receive both
    // the new goal, and the edge, at the same moment
    GoalWithEdge(GoalWithEdgeSignal),
    // custom signal type for goal_fully_archived
    // this is because it's important to the UI to receive
    // both the archived goal, and everything connected to it that
    // was archived at the same time
    ArchiveGoalFully(ArchiveGoalFullySignal),
    EditingGoal(EditingGoalSignal),
    GoalComment(ActionSignal<GoalComment>),
    GoalMember(ActionSignal<GoalMember>),
    GoalVote(ActionSignal<GoalVote>),
    Member(MemberSignal),
    ProjectMeta(ActionSignal<ProjectMeta>),
    RealtimeInfo(RealtimeInfoSignal),
}

impl From<ActionSignal<Edge>> for SignalType {
    fn from(value: ActionSignal<Edge>) -> Self {
        SignalType::Edge(value)
    }
}
impl From<ActionSignal<EntryPoint>> for SignalType {
    fn from(value: ActionSignal<EntryPoint>) -> Self {
        SignalType::EntryPoint(value)
    }
}
impl From<ActionSignal<Goal>> for SignalType {
    fn from(value: ActionSignal<Goal>) -> Self {
        SignalType::Goal(value)
    }
}
impl From<ActionSignal<GoalComment>> for SignalType {
    fn from(value: ActionSignal<GoalComment>) -> Self {
        SignalType::GoalComment(value)
    }
}
impl From<ActionSignal<GoalMember>> for SignalType {
    fn from(value: ActionSignal<GoalMember>) -> Self {
        SignalType::GoalMember(value)
    }
}
impl From<ActionSignal<GoalVote>> for SignalType {
    fn from(value: ActionSignal<GoalVote>) -> Self {
        SignalType::GoalVote(value)
    }
}
impl From<ActionSignal<ProjectMeta>> for SignalType {
    fn from(value: ActionSignal<ProjectMeta>) -> Self {
        SignalType::ProjectMeta(value)
    }
}

#[derive(Debug, Serialize, Deserialize, SerializedBytes)]
pub enum GoalField {
    Title,
    Description,
}

#[derive(Debug, Serialize, Deserialize, SerializedBytes)]
pub struct EditingGoalSignal {
    pub goal_field: GoalField,
    pub goal_address: HeaderHashB64,
    pub editing_agent: AgentPubKeyB64,
    pub is_editing: bool,
}

#[derive(Debug, Serialize, Deserialize, SerializedBytes)]
pub struct EditingGoalInput {
    pub goal_field: GoalField,
    pub goal_address: HeaderHashB64,
    pub is_editing: bool,
}

#[derive(Debug, Serialize, Deserialize, SerializedBytes)]
#[serde(rename_all = "camelCase")]
pub struct RealtimeInfoSignal {
    pub agent_pub_key: AgentPubKeyB64,
    pub project_id: String,
    pub goal_being_edited: Option<EditingGoalDetails>,
    pub goal_expanded_view: Option<HeaderHashB64>,
}

#[derive(Debug, Serialize, Deserialize, SerializedBytes)]
#[serde(rename_all = "camelCase")]
pub struct RealtimeInfoInput {
    pub project_id: String,
    pub goal_being_edited: Option<EditingGoalDetails>,
    pub goal_expanded_view: Option<HeaderHashB64>,
}
#[derive(Debug, Serialize, Deserialize, SerializedBytes)]
#[serde(rename_all = "camelCase")]
pub struct EditingGoalDetails {
    pub goal_address: HeaderHashB64,
    pub is_title: bool,
}
#[hdk_extern]
pub fn emit_realtime_info_signal(realtime_info: RealtimeInfoInput) -> ExternResult<()> {
    let realtime_info_signal = RealtimeInfoSignal {
        agent_pub_key: AgentPubKeyB64::new(agent_info()?.agent_latest_pubkey),
        project_id: realtime_info.project_id,
        goal_being_edited: realtime_info.goal_being_edited,
        goal_expanded_view: realtime_info.goal_expanded_view,
    };

    let signal = SignalType::RealtimeInfo(realtime_info_signal);
    let payload = ExternIO::encode(signal)?;
    let peers = get_peers_content()?;
    remote_signal(payload, peers)?;
    Ok(())
}
#[hdk_extern]
pub fn emit_editing_goal_signal(editing_goal_info: EditingGoalInput) -> ExternResult<()> {
    let editing_goal_signal = EditingGoalSignal {
        goal_field: editing_goal_info.goal_field,
        goal_address: editing_goal_info.goal_address,
        editing_agent: AgentPubKeyB64::new(agent_info()?.agent_latest_pubkey),
        is_editing: editing_goal_info.is_editing,
    };

    let signal = SignalType::EditingGoal(editing_goal_signal);
    let payload = ExternIO::encode(signal)?;
    let peers = get_peers_content()?;
    remote_signal(payload, peers)?;
    Ok(())
}

pub fn get_peers_latest() -> ExternResult<Vec<AgentPubKey>> {
    get_peers(GetOptions::latest())
}
pub fn get_peers_content() -> ExternResult<Vec<AgentPubKey>> {
    get_peers(GetOptions::content())
}

// used to get addresses of agents to send signals to
pub fn get_peers(get_options: GetOptions) -> ExternResult<Vec<AgentPubKey>> {
    let path_hash = Path::from(MEMBER_PATH).path_entry_hash()?;
    let get_latest = GetLatestEntry {};
    let fetch_links = FetchLinks {};
    let entries = fetch_links.fetch_links::<Member>(&get_latest, path_hash, get_options)?;
    let self_agent_pub_key = AgentPubKeyB64::new(agent_info()?.agent_latest_pubkey);
    Ok(entries
        .into_iter()
        // eliminate yourself as a peer
        .filter(|x| x.entry.address != self_agent_pub_key)
        .map(|x| AgentPubKey::from(x.entry.address))
        .collect::<Vec<AgentPubKey>>())
}

// receiver
// (forwards signals to the UI)
#[hdk_extern]
pub fn recv_remote_signal(signal: ExternIO) -> ExternResult<()> {
    let sig: SignalType = signal.decode()?;
    debug!("Received remote signal {:?}", sig);
    Ok(emit_signal(&signal)?)
}
