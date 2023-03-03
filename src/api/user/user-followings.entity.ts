import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

// there can be only 1 row of same follower+followee
@Unique('following_pair', ['follower', 'followee'])
@Entity('user_followings')
export class UserFollowing extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
  
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
  
  @JoinColumn({ name: 'follower_id' })
  @ManyToOne(() => User, follower => follower.id)
  follower: User;

  @JoinColumn({ name: 'followee_id' })
  @ManyToOne(() => User, followee => followee.id)
  followee: User;
}
