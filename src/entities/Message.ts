import { Entity, PrimaryColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("messages")
class Message {
    @PrimaryColumn()
    id:string;

    @Column()
    admin_id:string;

    @Column()
    text:string;

    /**
     * Tipagem de relacionamento da tabela messages com a tabela users
     *
     * @joinColumns: corresponde a coluna da atual tabela é feita a referência
     *
     * @ManyToOne: corresponde ao tipo de relacionamento entre as tabelas
     */

    @JoinColumn({ name: "user_id"})
    @ManyToOne(()=> User)
    user: User;

    @Column()
    user_id:string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Message }