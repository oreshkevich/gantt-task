import axios from 'axios';

export const getAllNotes = async () => {
  const response = await axios.get(
    'https://goal-df23f-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
  );
  if (response.data) {
    const notes = Object.keys(response.data).map((key) => {
      return {
        ...response.data[key],
        id: key,
      };
    });
    return notes;
  } else {
    return [];
  }
};
export const addNewNote = (newNote) => {
  return axios.post(
    'https://goal-df23f-default-rtdb.europe-west1.firebasedatabase.app/notes.json',
    newNote
  );
};
