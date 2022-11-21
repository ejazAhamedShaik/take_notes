import { NoteData, Tag } from "../../App";
import NoteForm from "../noteForm/NoteForm";
import { useNote } from "../notesLayout/NotesLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();
  return (
    <div>
      <h1 className="mb-4">EditNote</h1>
      <NoteForm
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
      />
    </div>
  );
};

export default EditNote;
