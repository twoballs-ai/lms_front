//TODO: В идеале обращение к api должно происходить через отдельные ассинхронные функции, которые будут добавлены в этот (или другой отдельный) файл, которые будут из него экспортироваться. Тогда не нужно будет большое количество урлов, пригодится один базовый serverUrl.
// ты имеешь ввиду репозиторий я понял.
// dev 
// export const serverUrl = "http://127.0.0.1:8001";
// prod 
export const serverUrl = "https://backend.courserio.ru";
export const apiUrl = `${serverUrl}/api/`;
export const apiLmsUrl = `${serverUrl}/api/v1/lms/`;
export const apiBaseUrl = `${serverUrl}/api/v1/base/`;
export const apiStudyUrl = `${serverUrl}/api/v1/study/`;
export const apiUserUrl = `${serverUrl}/api/v1/user/`;
export const typesApiUrl = `${serverUrl}/api/types/`;
export const apiBlogUrl = `${serverUrl}/api/v1/blog/`;
export const quizApiUrl = `${serverUrl}/api-quiz/`;

export const teacherApiUrl = `${serverUrl}/api/teacher/`;
export const teacherLoginApiUrl = `${serverUrl}/api/teacher-login`;

