drop type if exists statuses cascade;
drop table if exists carts cascade;
drop table if exists cart_items cascade;

create type statuses as enum ('OPEN', 'ORDERED');
create extension if not exists "uuid-ossp";

create table carts (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid not null default uuid_generate_v4(),
  created_at timestamp not null,
  updated_at timestamp not null,
  status statuses not null
);


create table cart_items (
  cart_id uuid not null,
  product_id uuid not null,
  count integer not null,
  constraint fk_carts foreign key(cart_id) references carts(id)
);

insert into carts(created_at, updated_at, status) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'OPEN');
insert into carts(created_at, updated_at, status) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'OPEN');
insert into carts(created_at, updated_at, status) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'OPEN');
insert into carts(created_at, updated_at, status) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'OPEN');
insert into carts(created_at, updated_at, status) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'OPEN');