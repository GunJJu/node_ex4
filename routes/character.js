const express = require("express")
const router = express.Router()

let characters = require('../models/characterModel')

router.get('/', (req,res)=>{
    try {
        res.status(200).json({message:"캐릭터 목록 조회 성공!",characters})
    } catch (error) {
        console.rog("조회 오류..! ", error)
        res.status(500).json({message:"서버 오류..!",error})
    }
})

router.get('/:id', (req,res)=>{
    try {
        const getId = Number(req.params.id)
        const index = characters.findIndex(item=>item.id === getId)

        if(index === -1){
            res.status(404).json({message:"사용자를 찾을 수 없습니다..!"})
        }

        res.status(200).json({message:"캐릭터 목록 조회 성공!",character:characters[index]})
    } catch (error) {
        console.log("조회 오류..! ", error)
        res.status(500).json({message:"서버 오류..!",error})
    }
})

router.post('/', (req,res)=>{
    try {
        const {name, level, isOnline} = req.body
        if(!name || typeof level !=='number'){
            res.status(400).json({ message: "이름과, 레벨은 공백없이 작성해주세요!" })
        }

        const newChar = {
            id: Date.now(),
            name,
            level,
            isOnline: isOnline ?? false //빈값인 경우는 null일때   false
        }

        res.status(200).json({message:"캐릭터 생성 성공!",characters})
    } catch (error) {
        console.log("조회 오류..! ", error)
        res.status(500).json({message:"서버 오류..!",error})
    }
})

module.exports = router