// index: listagem de todos registros
// store: criar um novo registro
// show: lista de um único registro
// update: alterar um registro
// drestroy: deletar um registro
import User from '../models/User'
import * as yup from 'yup'

class SessionController {
    index() { }
    async store(req, res) {
        const schema = yup.object().shape({
            email: yup.string().email().required()
        })
        const { email } = req.body

        if (!(await schema.isValid(req.body))) return res.status(400).json({error: 'email inválido'})


        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({ email })
        }
        
        return res.json(user)

    }
    show() { }
    update() { }
    destroy() { }
}

export default new SessionController()