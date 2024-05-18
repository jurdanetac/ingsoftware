-- Triggers
-- -----------------------------------------------------
-- Trigger check_admin_compra
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS check_admin_compra ON transacciones;

CREATE OR REPLACE FUNCTION check_admin_compra()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.importe_en_dolares < 0 AND NOT EXISTS (SELECT 1 FROM usuarios WHERE id = NEW.usuarios_id AND rol = 'administrador') THEN
        RAISE EXCEPTION 'Error: Solo el administrador puede registrar una compra.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_admin_compra
BEFORE INSERT ON transacciones
FOR EACH ROW EXECUTE FUNCTION check_admin_compra();

-- -----------------------------------------------------
-- Trigger validar_clientes_proveedores
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS validar_clientes_proveedores ON transacciones;

CREATE OR REPLACE FUNCTION validar_clientes_proveedores()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.clientes_id IS NULL AND NEW.proveedores_id IS NULL) OR (NEW.clientes_id IS NOT NULL AND NEW.proveedores_id IS NOT NULL) THEN
        RAISE EXCEPTION 'Error: clientes_id y proveedores_id no pueden ser ambos NULL o ambos diferentes de NULL.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validar_clientes_proveedores
BEFORE INSERT ON transacciones
FOR EACH ROW EXECUTE FUNCTION validar_clientes_proveedores();

-- -----------------------------------------------------
-- Trigger validar_monto
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS validar_monto ON transacciones;

CREATE OR REPLACE FUNCTION validar_monto()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.importe_en_dolares > 0 AND NEW.proveedores_id IS NOT NULL THEN
        RAISE EXCEPTION 'Error: El importe de una compra no puede ser positivo.';
    ELSIF NEW.importe_en_dolares < 0 AND NEW.clientes_id IS NOT NULL THEN
        RAISE EXCEPTION 'Error: El importe de una venta no puede ser negativo.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validar_monto
BEFORE INSERT ON transacciones
FOR EACH ROW EXECUTE FUNCTION validar_monto();

-- -----------------------------------------------------
-- Trigger actualizar_stock_monto
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS actualizar_stock_monto ON transacciones_tiene_productos;

CREATE OR REPLACE FUNCTION actualizar_stock_monto()
RETURNS TRIGGER AS $$
DECLARE
    total_amount DECIMAL(10, 2);
BEGIN
    -- Actualizar stock del producto
    UPDATE productos
    SET cantidad_disponible = cantidad_disponible - NEW.cantidad
    WHERE id = NEW.productos_id;

    -- Calcular el monto total de la transacción
    SELECT SUM(tp.cantidad * p.precio_en_dolares) INTO total_amount
    FROM transacciones_tiene_productos tp
    JOIN productos p ON tp.productos_id = p.id
    WHERE tp.transacciones_id = NEW.transacciones_id;

    -- Actualizar el importe de la transacción
    UPDATE transacciones
    SET importe_en_dolares = total_amount
    WHERE id = NEW.transacciones_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_stock_monto
AFTER INSERT ON transacciones_tiene_productos
FOR EACH ROW EXECUTE FUNCTION actualizar_stock_monto();
