const express = require("express")
const router = express.Router()

let characters = require('../models/characterModel')
const character = require("../models/characterModel")

router.post('/', async (req, res) => {
    try {
        const { name, level, isOnline } = req.body

        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: 'name과 level은 필수 입니다.' })
        }
        const newChar = new characters({
            name,
            level,
            isOnline: isOnline ?? false
        })

        const saveChar = await newChar.save()

        res.status(200).json({ message: '캐릭터 추가하기 성공', character: saveChar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

router.get('/', async (req, res) => {
    try {
        const characters = await character.find()
        res.status(200).json({ message: '캐릭터 추가하기 성공', characters })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const charId = req.params.id
        const Character = await character.findById(charId)
        if (!Character) {
            return res.status(404).json({ message: '캐릭터를 찾을 수 없습니다.' })
        }
        res.status(200).json({ message: '캐릭터 조회 성공', Character })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { name, level, isOnline } = req.body

        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: 'name과 level은 필수 입니다.' })
        }

        const updateChar = await character.findByIdAndUpdate(
            req.params.id,
            {
                name,
                level,
                isOnline: isOnline ?? false
            },
            {
                new: true,
                runValidators: true
            }

        )

        if (!updateChar) {
            return res.status(404).json({ message: '캐릭터를 찾을 수 없습니다.' })
        }


        res.status(200).json({ message: '캐릭터 추가하기 성공', character: updateChar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const charId = req.params.id
        const Character = await character.findByIdAndDelete(charId)
        if (!Character) {
            return res.status(404).json({ message: '캐릭터를 찾을 수 없습니다.' })
        }
        res.status(200).json({ message: '캐릭터 삭제 성공', Character })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})



module.exports = router