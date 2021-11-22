--REGIONS

insert into region(id, name) values (1, 'Durban');
insert into region(id, name) values (2, 'Cape Town');
insert into region(id, name) values (3, 'Gauteng');

--ROUTES

insert into routes(name, fare) values ('Cape Town - Bellville', 15);
insert into routes(name, fare) values ('Cape Town - Gugulethu', 12);
insert into routes(name, fare) values ('Cape Town - Langa', 8);

insert into routes(name, fare) values ('Sandton - Randburg', 9);
insert into routes(name, fare) values ('Alexandra - Sandton', 9);
insert into routes(name, fare) values ('Sandton - Midrand', 9);

insert into routes(name, fare) values ('Umlazi - Durban Central', 14);
insert into routes(name, fare) values ('Durban Central - Umhlanga Rocks', 17);
insert into routes(name, fare) values ('Durban Central - Umbilo', 7);

--TAXIS

insert into taxi(reg_number, region_id) values ('ND 12345', 1);
insert into taxi(reg_number, region_id) values ('ND 54321', 1);
insert into taxi(reg_number, region_id) values ('ND 98765', 1);

insert into taxi(reg_number, region_id) values ('CA 76543', 2);
insert into taxi(reg_number, region_id) values ('CA 12376', 2);
insert into taxi(reg_number, region_id) values ('CA 98734', 2);

insert into taxi(reg_number, region_id) values ('GP 67890', 3);
insert into taxi(reg_number, region_id) values ('GP 09512', 3);
insert into taxi(reg_number, region_id) values ('GP 12094', 3);

--TRIPS

    --'ND 12345' TRIPS
insert into trips(taxi_id, route_id) values (1, 1);
insert into trips(taxi_id, route_id) values (1, 1);
insert into trips(taxi_id, route_id) values (1, 2);

    --'ND 54321' TRIPS
insert into trips(taxi_id, route_id) values (2, 2);
insert into trips(taxi_id, route_id) values (2, 2);
insert into trips(taxi_id, route_id) values (2, 1);
insert into trips(taxi_id, route_id) values (2, 3);

    --'ND 98765' TRIPS
insert into trips(taxi_id, route_id) values (3, 3);
insert into trips(taxi_id, route_id) values (3, 3);
insert into trips(taxi_id, route_id) values (3, 3);

    --'CA 76543' TRIPS
insert into trips(taxi_id, route_id) values (4, 4);
insert into trips(taxi_id, route_id) values (4, 6);
insert into trips(taxi_id, route_id) values (4, 5);

    --'CA 12376' TRIPS
insert into trips(taxi_id, route_id) values (5, 6);
insert into trips(taxi_id, route_id) values (5, 6);
insert into trips(taxi_id, route_id) values (5, 4);
insert into trips(taxi_id, route_id) values (5, 5);

    --'CA 98734' TRIPS
insert into trips(taxi_id, route_id) values (6, 5);
insert into trips(taxi_id, route_id) values (6, 5);
insert into trips(taxi_id, route_id) values (6, 4);

    --'GP 67890' TRIPS
insert into trips(taxi_id, route_id) values (7, 7);
insert into trips(taxi_id, route_id) values (7, 7);
insert into trips(taxi_id, route_id) values (7, 8);
insert into trips(taxi_id, route_id) values (7, 8);
insert into trips(taxi_id, route_id) values (7, 8);


    --'GP 09512' TRIPS
insert into trips(taxi_id, route_id) values (8, 9);
insert into trips(taxi_id, route_id) values (8, 9);
insert into trips(taxi_id, route_id) values (8, 7);
insert into trips(taxi_id, route_id) values (8, 8);


    --'GP 12094'TRIPS
insert into trips(taxi_id, route_id) values (9, 7);
insert into trips(taxi_id, route_id) values (9, 8);
insert into trips(taxi_id, route_id) values (9, 8);