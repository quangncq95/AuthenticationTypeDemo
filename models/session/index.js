const SessionList = [];

function addSession(session) {
  const newSs = {
    id: session.id,
    user: session.user,
  };
  SessionList.push(newSs);

  return newSs;
}

function getSession(sessionId) {
  const session = SessionList.find((session) => session.id === sessionId);
  if (session) return session;
  else throw new Error("session not found");
}

function removeSession(sessionId) {
  const ssIndex = SessionList.findIndex((session) => session.id === sessionId);
  if (ssIndex >= 0) {
    SessionList.splice(ssIndex, 1);
  } else {
    throw new Error("session not found");
  }
}

module.exports = {
  addSession,
  getSession,
  removeSession,
};
