-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  apellido text,
  telefono text,
  direccion text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Create categories table
create table if not exists public.categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  icono text,
  orden int,
  activo boolean default true,
  created_at timestamp with time zone default now()
);

-- Enable RLS for categories (public read, admin write)
alter table public.categorias enable row level security;

create policy "categorias_select_all" on public.categorias for select using (true);
create policy "categorias_insert_admin" on public.categorias for insert with check (
  exists (select 1 from auth.users where id = auth.uid() and raw_user_meta_data->>'is_admin' = 'true')
);
create policy "categorias_update_admin" on public.categorias for update using (
  exists (select 1 from auth.users where id = auth.uid() and raw_user_meta_data->>'is_admin' = 'true')
);
create policy "categorias_delete_admin" on public.categorias for delete using (
  exists (select 1 from auth.users where id = auth.uid() and raw_user_meta_data->>'is_admin' = 'true')
);

-- Create products table
create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  precio decimal(10,2) not null,
  categoria_id uuid references public.categorias(id) on delete set null,
  imagen text,
  disponible boolean default true,
  tiempo_preparacion int, -- minutos
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS for products (public read, admin write)
alter table public.productos enable row level security;

create policy "productos_select_all" on public.productos for select using (true);
create policy "productos_insert_admin" on public.productos for insert with check (
  exists (select 1 from auth.users where id = auth.uid() and raw_user_meta_data->>'is_admin' = 'true')
);
create policy "productos_update_admin" on public.productos for update using (
  exists (select 1 from auth.users where id = auth.uid() and raw_user_meta_data->>'is_admin' = 'true')
);
create policy "productos_delete_admin" on public.productos for delete using (
  exists (select 1 from auth.users where id = auth.uid() and raw_user_meta_data->>'is_admin' = 'true')
);

-- Create cart table
create table if not exists public.carrito (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  producto_id uuid not null references public.productos(id) on delete cascade,
  cantidad int not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, producto_id)
);

-- Enable RLS for cart
alter table public.carrito enable row level security;

create policy "carrito_select_own" on public.carrito for select using (auth.uid() = user_id);
create policy "carrito_insert_own" on public.carrito for insert with check (auth.uid() = user_id);
create policy "carrito_update_own" on public.carrito for update using (auth.uid() = user_id);
create policy "carrito_delete_own" on public.carrito for delete using (auth.uid() = user_id);

-- Create orders table
create table if not exists public.pedidos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  numero_pedido text unique not null,
  total decimal(10,2) not null,
  estado text not null default 'pendiente', -- pendiente, confirmado, en_preparacion, en_camino, entregado, cancelado
  direccion_entrega text not null,
  telefono_contacto text not null,
  notas text,
  metodo_pago text not null, -- efectivo, tarjeta, transferencia
  repartidor_id uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS for orders
alter table public.pedidos enable row level security;

create policy "pedidos_select_own" on public.pedidos for select using (
  auth.uid() = user_id or 
  exists (select 1 from auth.users where id = auth.uid() and raw_user_meta_data->>'is_admin' = 'true')
);
create policy "pedidos_insert_own" on public.pedidos for insert with check (auth.uid() = user_id);
create policy "pedidos_update_admin" on public.pedidos for update using (
  exists (select 1 from auth.users where id = auth.uid() and raw_user_meta_data->>'is_admin' = 'true')
);

-- Create order items table
create table if not exists public.pedido_items (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references public.pedidos(id) on delete cascade,
  producto_id uuid not null references public.productos(id),
  nombre_producto text not null,
  cantidad int not null,
  precio_unitario decimal(10,2) not null,
  subtotal decimal(10,2) not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS for order items
alter table public.pedido_items enable row level security;

create policy "pedido_items_select" on public.pedido_items for select using (
  exists (
    select 1 from public.pedidos 
    where pedidos.id = pedido_items.pedido_id 
    and (pedidos.user_id = auth.uid() or 
         exists (select 1 from auth.users where id = auth.uid() and raw_user_meta_data->>'is_admin' = 'true'))
  )
);
create policy "pedido_items_insert" on public.pedido_items for insert with check (
  exists (
    select 1 from public.pedidos 
    where pedidos.id = pedido_items.pedido_id 
    and pedidos.user_id = auth.uid()
  )
);

-- Create indexes for better performance
create index if not exists idx_productos_categoria on public.productos(categoria_id);
create index if not exists idx_carrito_user on public.carrito(user_id);
create index if not exists idx_pedidos_user on public.pedidos(user_id);
create index if not exists idx_pedidos_estado on public.pedidos(estado);
create index if not exists idx_pedido_items_pedido on public.pedido_items(pedido_id);
