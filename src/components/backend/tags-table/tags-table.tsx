import React, { useState } from "react";
import TagModel from "../../../types/TagModel";
import Modal from "../../modal";
import TagsForm from "../../tags/tags-form";

interface TagsTableInterface {
  items: TagModel[];
}

const TagsTableItem: React.FC<{ item: TagModel }> = ({ item}) => {
  const [isModalOpened, setModalOpened] = useState(false);
  const { title, slug, score } = item;

  function handleEditItemClick() {
    setModalOpened(true);
  }

  function handleModalClose() {
    setModalOpened(false);
  }

  function handleUpdateTable() {
      setModalOpened(false);
  }

  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{slug}</td>
        <td>{score}</td>
        <td>
          <button className="btn btn-outline-primary" onClick={handleEditItemClick}>
            Редактировать
          </button>
        </td>
      </tr>
      {isModalOpened && (
        <Modal
          title={`Редактирование тэга: ${title}`}
          content={<TagsForm tagItem={item} successClbk={handleUpdateTable}/>}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

const TagsTable: React.FC<TagsTableInterface> = ({ items }) => {
  return (
    <table className="table table-responsive table-hover">
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">Url</th>
          <th scope="col">Популярность</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item: TagModel) => {
          return <TagsTableItem key={item.id} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default TagsTable;
