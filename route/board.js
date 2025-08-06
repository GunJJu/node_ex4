const express = require("express")
const router = express.Router()

let boards=require("../models/boardModel")

router.get('/', (req, res)=>{
    try {
        res.status(200).json({message:"전체 게시물 가져오기", boards})
    } catch (error) {
        res.status(500).json({message:"서버오류",error})
    }
})

router.get('/:id', (req, res)=>{
    try {
        const boardId = Number(req.params.id)
        const board = boards.find(item=>item.id===boardId)
        //findindex는 id만 가져오지만 find는 정보를 다 가져옴

        if (!board) {
            return res.status(404).json({ message: "게시물을 찾을 수 없습니다." })
        }

        res.status(200).json({message:"게시물 1개 가져오기", board})
    } catch (error) {
        res.status(500).json({message:"서버오류",error})
    }
})

router.post('/', (req, res)=>{
    try {
        const {title, content} = req.body
        if(!title || !content){
            res.status(400).json({message:"제목과 내용을 모두 입력하세요"})
        }

        const newBoard = {
            id:Date.now(),
            title,
            content
        }

        boards.push(newBoard)

        res.status(200).json({message:"전체 게시물 가져오기", boards})
    } catch (error) {
        res.status(500).json({message:"서버오류",error})
    }
})

router.put('/:id', (req, res)=>{
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(item=>item.id===boardId)
        //findindex는 id만 가져오지만 find는 정보를 다 가져옴

        if (index === -1) {
            return res.status(404).json({ message: "게시물을 찾을 수 없습니다." })
        }

        const updateData = req.body
        boards[index] = {
            ...users[index],
            ...updateData
        }

        boards.push(newBoard)

        res.status(200).json({message:"선택한 게시물 수정 완료!", boards})
    } catch (error) {
        res.status(500).json({message:"서버오류",error})
    }
})

router.delete('/:id', (req, res)=>{
try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(item=>item.id===boardId)

        if (index === -1) {
            return res.status(404).json({ message: "게시물을 찾을 수 없습니다." })
        }

        boards.splice(index,1)
        res.status(200).json({message:"게시물 삭제 완료!", boards})
} catch (error) {
    res.status(500).json({message:"서버오류",error})
}

})

module.exports = router