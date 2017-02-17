import {models} from '../models'

export function create() {
    return models.Tag.create({
        name: new Date().toString()
    })
}

export function findAll() {
    return models.Tag.findAll()
}