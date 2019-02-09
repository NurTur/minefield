export const USER = "USER";
export const SetUSER = (obj) => { return { type: USER, payload: { name: obj.name, id: obj.id } } };


