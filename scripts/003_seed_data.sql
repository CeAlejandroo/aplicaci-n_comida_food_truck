-- Insert sample categories
insert into public.categorias (nombre, icono, orden) values
  ('Hamburguesas', '🍔', 1),
  ('Pizza', '🍕', 2),
  ('Bebidas', '🥤', 3),
  ('Postres', '🍰', 4),
  ('Ensaladas', '🥗', 5)
on conflict do nothing;

-- Get category IDs
do $$
declare
  cat_hamburguesa uuid;
  cat_pizza uuid;
  cat_bebidas uuid;
  cat_postres uuid;
  cat_ensaladas uuid;
begin
  select id into cat_hamburguesa from public.categorias where nombre = 'Hamburguesas' limit 1;
  select id into cat_pizza from public.categorias where nombre = 'Pizza' limit 1;
  select id into cat_bebidas from public.categorias where nombre = 'Bebidas' limit 1;
  select id into cat_postres from public.categorias where nombre = 'Postres' limit 1;
  select id into cat_ensaladas from public.categorias where nombre = 'Ensaladas' limit 1;

  -- Insert sample products
  insert into public.productos (nombre, descripcion, precio, categoria_id, tiempo_preparacion) values
    ('Hamburguesa Clasica', 'Carne de res, lechuga, tomate, queso y salsa especial', 45.00, cat_hamburguesa, 15),
    ('Hamburguesa Doble', 'Doble carne, doble queso, lechuga, tomate y cebolla', 65.00, cat_hamburguesa, 20),
    ('Hamburguesa BBQ', 'Carne de res, queso cheddar, tocino, cebolla caramelizada y salsa BBQ', 55.00, cat_hamburguesa, 18),
    ('Pizza Pepperoni', 'Salsa de tomate, mozzarella y pepperoni', 120.00, cat_pizza, 25),
    ('Pizza Hawaiana', 'Salsa de tomate, mozzarella, jamon y piña', 110.00, cat_pizza, 25),
    ('Pizza Vegetariana', 'Salsa de tomate, mozzarella, pimiento, champiñones, cebolla y aceitunas', 115.00, cat_pizza, 25),
    ('Coca Cola', 'Refresco 500ml', 20.00, cat_bebidas, 2),
    ('Agua Natural', 'Agua embotellada 600ml', 15.00, cat_bebidas, 2),
    ('Jugo de Naranja', 'Jugo natural de naranja 400ml', 25.00, cat_bebidas, 5),
    ('Pastel de Chocolate', 'Porcion de pastel de chocolate con crema', 40.00, cat_postres, 5),
    ('Helado', 'Copa de helado de vainilla con topping', 35.00, cat_postres, 3),
    ('Ensalada Cesar', 'Lechuga romana, crutones, queso parmesano y aderezo cesar', 55.00, cat_ensaladas, 10),
    ('Ensalada Mixta', 'Lechuga, tomate, pepino, zanahoria y aderezo', 45.00, cat_ensaladas, 8)
  on conflict do nothing;
end $$;
