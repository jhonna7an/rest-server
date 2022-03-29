const Role = require('../models/role');
const User = require('../models/user');

const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol) {
        throw new Error(`El rol ${role} no está reistrado en la BD`)
    }
};

const emailExiste = async (mail = '') => {
    const existeMail = await User.findOne({mail});
    if (existeMail) {
        throw new Error(`El correo: ${mail}, ya está registrado`);
    }
}

const existeUserById = async (id) => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUserById
}