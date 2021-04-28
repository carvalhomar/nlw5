import { Entity, PrimaryColumn, CreateDateColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("connections")
class Connection {
    @PrimaryColumn()
    id:string;

    @Column()
    admin_id:string;

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

    @Column()
    socket_id:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Connection }