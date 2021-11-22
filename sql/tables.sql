CREATE TABLE routes(
    id serial primary key, 
    name text not null, 
    fare int not null);

CREATE TABLE region(
    id int primary key, 
    name text not null);

CREATE TABLE taxi(
    id serial primary key, 
    reg_number text not null, 
    region_id int not null,
    CONSTRAINT fk_region FOREIGN KEY(region_id) REFERENCES region(id));

CREATE TABLE trips(
    id serial primary key,
    taxi_id int not null,
    route_id int not null,
    CONSTRAINT fk_taxi 
        FOREIGN KEY(taxi_id) 
            REFERENCES taxi(id),
    CONSTRAINT fk_route 
        FOREIGN KEY(route_id) 
            REFERENCES routes(id)
)