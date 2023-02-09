import {loadBoard, removeBoard, renameBoard} from "./controller/boardsManager.js";
import {initDropAndColumns} from "./controller/statusesManager.js";

export let socket = io.connect('http://localhost:5000/');
export function webSocket(){
    setInterval(() => {
      const start = Date.now();
      socket.emit("ping", () => {
        const duration = Date.now() - start;
        // console.log(duration);
      });
    }, 1000);
    socket.on('create board', async function(board) {
        let username = document.querySelector('#current_username').innerText
        if (board.owner === username || board.type === 'public'){
            await loadBoard(board)
            await initDropAndColumns(board)
        }
    });
    socket.on('delete board', function(boardId) {
        removeBoard(boardId)
    });
     socket.on('update title', async function(data) {
        let titleId = data['titleId']
        let boardTitle = document.querySelector(`#${data['boardId']}`);
        if (boardTitle !== null){
        boardTitle.outerHTML =  `<span class="board-title" id="${data['boardId']}" data-board-title-id="${titleId}">${data['inputText']}</span>`
            boardTitle = await document.querySelector(`#${data['boardId']}`);
         boardTitle.addEventListener('click', renameBoard);
    }});
}
