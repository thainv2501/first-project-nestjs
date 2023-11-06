import { PrimaryGeneratedColumn, Entity ,Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export abstract class baseEntity {
    @CreateDateColumn({type : "timestamptz"})
    created_at: Date; // Creation date

    @UpdateDateColumn({type : "timestamptz"})
    updated_at: Date; // Last updated date
}