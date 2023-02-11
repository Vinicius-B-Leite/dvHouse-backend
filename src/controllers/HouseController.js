import House from '../models/House'
import User from '../models/User'
import * as yup from 'yup'


class HouseController {
    async index(req, res) {

        const { status } = req.query

        const houses = await House.find({ status })

        return res.json(houses)

    }
    async store(req, res) {
        const { filename } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers


        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status
        })

        return res.json(house)
    }
    show() { }
    async update(req, res) {

        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required(),
        })

        const { filename } = req.file
        const { house_id } = req.params
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        if (!(await schema.isValid(req.body))) return res.status(400).json({ message: "Envia todos os dados" })

        const user = await User.findById(user_id)
        const houses = await House.findById(house_id)

        if (user._id !== houses.user) {
            return res.status(401).json({ message: "Acesso barrado" })
        }

        await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status
        })

        return res.send()
    }
    async destroy(req, res) {
        const { house_id } = req.body
        const { user_id } = req.headers

        await House.findByIdAndDelete({ _id: house_id })


        return res.send('Casa deletada')
    }
}

export default new HouseController()