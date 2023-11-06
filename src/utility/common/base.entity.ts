import { PrimaryGeneratedColumn, Entity ,Column} from 'typeorm';

@Entity()
export abstract class baseEntity {
    @Column({ type: 'timestamp' }) 
    createdDate: Date

    @Column({ type: 'timestamp' }) 
    updatedDate: Date
}