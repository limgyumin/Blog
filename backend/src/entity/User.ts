import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity("user")
export default class User extends BaseEntity {
  //순서
  @PrimaryGeneratedColumn()
  idx: number;

  //아이디
  @Column({
    length: 255,
    nullable: false,
  })
  id: string;

  //이름
  @Column({
    length: 255,
    nullable: false,
  })
  name: string;

  //한줄소개
  @Column({
    length: 255,
    nullable: true,
  })
  bio: string;

  //생성일
  @Column("timestamptz")
  @CreateDateColumn()
  created_at: Date;
}
