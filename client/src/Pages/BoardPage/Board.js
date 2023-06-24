import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Navbar from "../../Components/Navbar";
import TopBar from "./BoardComponents/TopBar/TopBar";
import AddList from "./BoardComponents/AddList/AddList";
import List from "./BoardComponents/List/List";
import LoadingScreen from "../../Components/LoadingScreen";

import * as style from "./Styled";

import { getBoard } from "../../Services/boardsService";
import { getLists } from "../../Services/boardService";
import {
  updateCardOrder,
  updateListOrder,
} from "../../Services/dragAndDropService";
import { useParams } from "react-router-dom";

export function Board(props) {
  const { id } = useParams();
  const boardId = id;

  console.log(id);
  const dispatch = useDispatch();
  const { backgroundImageLink, isImage, loading, title } = useSelector(
    (state) => state.board
  );
  const { allLists, loadingListService } = useSelector((state) => state.list);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    getBoard(boardId, dispatch);
    getLists(boardId, dispatch);
  }, [boardId, dispatch]);

  useEffect(() => {
    document.title = title + " | Trello Clone";
  }, [title]);

  const onDragEnd = async (result) => {
    const { draggableId, source, destination } = result;
    if (!destination) return;
    if (result.type === "column") {
      if (source.index === destination.index) return;
      await updateListOrder(
        {
          sourceIndex: source.index,
          destinationIndex: destination.index,
          listId: draggableId,
          boardId: boardId,
          allLists: allLists,
        },
        dispatch
      );
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    await updateCardOrder(
      {
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        cardId: draggableId,
        boardId: boardId,
        allLists: allLists,
      },
      dispatch
    );
  };

  return (
    <>
      <Navbar searchString={searchString} setSearchString={setSearchString} />
      <style.Container
        isImage={isImage}
        bgImage={
          isImage ? backgroundImageLink.split("?")[0] : backgroundImageLink
        }
      >
        <TopBar />
        {(loading || loadingListService) && <LoadingScreen />}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided, snapshot) => {
              return (
                <style.ListContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {!loading &&
                    allLists.map((list, index) => {
                      return (
                        <List
                          searchString={searchString}
                          key={list._id}
                          index={index}
                          info={list}
                          boardId={boardId}
                        />
                      );
                    })}
                  {provided.placeholder}
                  <AddList boardId={boardId} />
                </style.ListContainer>
              );
            }}
          </Droppable>
        </DragDropContext>
      </style.Container>
    </>
  );
}

export default Board;
