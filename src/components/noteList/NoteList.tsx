import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../../App";
import NotesCard from "../notesCard/NotesCard";

type SimplifiedNotes = {
  tags: Tag[];
  title: string;
  id: string;
};
type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNotes[];
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  console.log(selectedTags.length);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
  console.log(filteredNotes);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs={"auto"}>
          <Stack gap={2} direction={"horizontal"}>
            <Link to={"/new"}>
              <Button variant="primary">Create</Button>
            </Link>
            <Link to={"/"}>
              <Button variant="outline-secondary">Edit Tags</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type={"text"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                options={availableTags.map((option) => {
                  return { label: option.label, id: option.id };
                })}
                value={selectedTags?.map((tag) => {
                  return { label: tag.label, id: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.id };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id}>
              <NotesCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default NoteList;
