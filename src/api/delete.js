import { deleteTeamApi, ENDPOINT } from './api';

const { RECIPIENTS, MESSAGES } = ENDPOINT;

/** 특정 메세지 지우기 */
export const deleteMessage = async (messageId) => deleteTeamApi(`${MESSAGES}${messageId}/`);

/** 롤링페이퍼 대상 삭제 */
export const deleteRecipient = async (id) => deleteTeamApi(`${RECIPIENTS}${id}/`);
