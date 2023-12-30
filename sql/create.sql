create type statuses as enum ('OPEN', 'ORDERED');
create extension if not exists "uuid-ossp";

create table carts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  status statuses not null
);

create table cart_items (
  id uuid default uuid_generate_v4() primary key,
  cart_id uuid not null,
  product_id uuid default uuid_generate_v4(),
  count integer not null,
  constraint fk_carts foreign key(cart_id) references carts(id) on delete cascade
);
