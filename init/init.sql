CREATE TABLE product (
  id serial primary key, 
  owner varchar(50) not null, 
  category varchar(100) not null, 
  price numeric(10,2) not null, 
  description text not null
);


create table category ( 

  id serial primary key, 
  owner varchar(50) not null, 
  description text not null

)
