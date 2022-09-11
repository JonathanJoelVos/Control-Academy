import { describe, expect, jest } from "@jest/globals";
import crud from "../../controller/crud";

describe('Testando CRUD', () => {
    const objetoActions = {
        name:"jojo",
        methods: ["test"],
    }
    
    it('Deve criar um objeto', async () => {
        crud.create = jest.fn().mockReturnValueOnce({
            _id: "tetdas332sad",
            name: "jojo",
            methods: ["test"]
        })

        const retorno = crud.create();

        expect(retorno).toEqual(expect.objectContaining({
            _id: expect.any(String),
            ...objetoActions
        }));
       
    it('Deve ler um objeto', () => {
        crud.read()
    })
    })
})


