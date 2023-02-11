import Reserve from "../models/Reserve";
import House from "../models/House";
import User from "../models/User";
import * as yup from 'yup'

class ReserveController {
    async store(req, res) {
        const { house_id } = req.params
        const { user_id } = req.headers
        const { date } = req.body


        const house = await House.findById(house_id)
        if (!house) return res.status(400).json({ message: 'Casa não disponível. Envia um ID válido.' })
        if (house.status == false) return res.status(400).json({ message: 'Esta casa já está alugada' })

        const user = await User.findById(user_id)
        if (String(user._id) == String(house.user)) return res.status(401).json({ message: 'Reserva não permitida' })



        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date
        })

        Reserve.findById({ _id: reserve._id })
            .populate("house")
            .populate("user")
            .exec(function (err, reserve) {
                return res.json(reserve);
            });

    }

    async index(req, res) {
        const { user_id } = req.headers
        const houses = await House.find({ user: user_id })

        return res.json(houses)
    }

    async destroy(req, res) {

        const { house_id } = req.body
        await House.findByIdAndDelete(house_id)

        res.json({ message: 'Casa deletada' })
    }
}

export default new ReserveController()