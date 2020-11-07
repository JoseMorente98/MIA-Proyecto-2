-- TABLA PAIS
CREATE table "PAIS" (
    "ID"         NUMBER(9,0) NOT NULL,
    "NOMBRE"     VARCHAR2(255) NOT NULL,
    constraint  "PAIS_PK" primary key ("ID")
);

-- SECUENCIA INCREMENTABLE ID
CREATE sequence "PAIS_SEQ";

CREATE trigger "BI_PAIS"  
  before insert on "PAIS"              
  for each row 
begin  
  if :NEW."ID" is null then
    select "PAIS_SEQ".nextval into :NEW."ID" from dual;
  end if;
end;
  
-- TABLA USUARIO
CREATE table "USUARIO" (
    "ID"         NUMBER(9) NOT NULL,
    "NOMBRE"     VARCHAR2(255) NOT NULL,
    "APELLIDO"   VARCHAR2(255) NOT NULL,
    "EMAIL"      VARCHAR2(255) NOT NULL,
    "PASSWORD"   VARCHAR2(255) NOT NULL,
    "PICTURE"    VARCHAR2(255),
    "ROL"        VARCHAR2(255),
    "FECHA"      DATE,
    "CREDITO"    NUMBER(9,2),
    "ACTIVO"     VARCHAR2(255),
    "PAIS"       NUMBER(9),
    constraint  "USUARIO_PK" primary key ("ID"),
    CONSTRAINT "USUARIO_PAIS_FK" FOREIGN KEY ("PAIS") REFERENCES "PAIS" ("ID")
);

-- SECUENCIA INCREMENTABLE ID
CREATE sequence "USUARIO_SEQ";

CREATE trigger "BI_USUARIO"  
  before insert on "USUARIO"              
  for each row 
begin  
  if :NEW."ID" is null then
    select "USUARIO_SEQ".nextval into :NEW."ID" from dual;
  end if;
end;

-- TABLA CATEGORIA
CREATE table "CATEGORIA" (
    "ID"            NUMBER(9,0) NOT NULL,
    "NOMBRE"        VARCHAR2(255) NOT NULL,
    "DESCRIPCION"   VARCHAR2(255) NOT NULL,
    "PICTURE"       VARCHAR2(255) NOT NULL,
    constraint      "CATEGORIA_PK" primary key ("ID")
);

-- SECUENCIA INCREMENTABLE ID
CREATE sequence "CATEGORIA_SEQ";

CREATE trigger "BI_CATEGORIA"  
  before insert on "CATEGORIA"              
  for each row 
begin  
  if :NEW."ID" is null then
    select "CATEGORIA_SEQ".nextval into :NEW."ID" from dual;
  end if;
end;

-- TABLA PRODUCTO
CREATE table "PRODUCTO" (
    "ID"          NUMBER(9) NOT NULL,
    "NOMBRE"      VARCHAR2(255) NOT NULL,
    "DESCRIPCION" VARCHAR2(500) NOT NULL,
    "CLAVE"       VARCHAR2(255) NOT NULL,
    "PICTURE"     VARCHAR2(255),
    "PRECIO"      NUMBER(9,2),
    "ESTADO"      NUMBER(9),
    "CATEGORIA"   NUMBER(9),
    "USUARIO"     NUMBER(9),
    constraint  "PRODUCTO_PK" primary key ("ID"),
    CONSTRAINT "PRODUCTO_CATEGORIA_FK" FOREIGN KEY ("CATEGORIA") REFERENCES "CATEGORIA" ("ID"),
    CONSTRAINT "PRODUCTO_USUARIO_FK" FOREIGN KEY ("USUARIO") REFERENCES "USUARIO" ("ID")
);

-- SECUENCIA INCREMENTABLE ID
CREATE sequence "PRODUCTO_SEQ";

CREATE trigger "BI_PRODUCTO"  
  before insert on "PRODUCTO"              
  for each row 
begin  
  if :NEW."ID" is null then
    select "PRODUCTO_SEQ".nextval into :NEW."ID" from dual;
  end if;
end;

-- TABLA DENUNCIA
CREATE table "DENUNCIA" (
    "ID"          NUMBER(9) NOT NULL,
    "DESCRIPCION" VARCHAR2(500) NOT NULL,
    "FECHA"       DATE DEFAULT (sysdate),
    "ESTADO"      NUMBER(9),
    "PRODUCTO"    NUMBER(9),
    "USUARIO"     NUMBER(9),
    constraint  "DENUNCIA_PK" primary key ("ID"),
    CONSTRAINT "DENUNCIA_PRODUCTO_FK" FOREIGN KEY ("PRODUCTO") REFERENCES "PRODUCTO" ("ID"),
    CONSTRAINT "DENUNCIA_USUARIO_FK" FOREIGN KEY ("USUARIO") REFERENCES "USUARIO" ("ID")
);

-- SECUENCIA INCREMENTABLE ID
CREATE sequence "DENUNCIA_SEQ";

CREATE trigger "BI_DENUNCIA"  
  before insert on "DENUNCIA"              
  for each row 
begin  
  if :NEW."ID" is null then
    select "DENUNCIA_SEQ".nextval into :NEW."ID" from dual;
  end if;
end;

-- TABLA COMENTARIO
CREATE table "COMENTARIO" (
    "ID"          NUMBER(9) NOT NULL,
    "DESCRIPCION" VARCHAR2(500) NOT NULL,
    "FECHA"       DATE DEFAULT (sysdate),
    "PRODUCTO"    NUMBER(9),
    "USUARIO"     NUMBER(9),
    constraint  "COMENTARIO_PK" primary key ("ID"),
    CONSTRAINT "COMENTARIO_PRODUCTO_FK" FOREIGN KEY ("PRODUCTO") REFERENCES "PRODUCTO" ("ID"),
    CONSTRAINT "COMENTARIO_USUARIO_FK" FOREIGN KEY ("USUARIO") REFERENCES "USUARIO" ("ID")
);

-- SECUENCIA INCREMENTABLE ID
CREATE sequence "COMENTARIO_SEQ";

CREATE trigger "BI_COMENTARIO"  
  before insert on "COMENTARIO"              
  for each row 
begin  
  if :NEW."ID" is null then
    select "COMENTARIO_SEQ".nextval into :NEW."ID" from dual;
  end if;
end;

-- TABLA MEGUSTA
CREATE table "MEGUSTA" (
    "ID"          NUMBER(9) NOT NULL,
    "ESTADO"      NUMBER(9),
    "PRODUCTO"    NUMBER(9),
    "USUARIO"     NUMBER(9),
    constraint  "MEGUSTA_PK" primary key ("ID"),
    CONSTRAINT "MEGUSTA_PRODUCTO_FK" FOREIGN KEY ("PRODUCTO") REFERENCES "PRODUCTO" ("ID"),
    CONSTRAINT "MEGUSTA_USUARIO_FK" FOREIGN KEY ("USUARIO") REFERENCES "USUARIO" ("ID")
);

-- SECUENCIA INCREMENTABLE ID
CREATE sequence "MEGUSTA_SEQ";

CREATE trigger "BI_MEGUSTA"  
  before insert on "MEGUSTA"              
  for each row 
begin  
  if :NEW."ID" is null then
    select "MEGUSTA_SEQ".nextval into :NEW."ID" from dual;
  end if;
end;

-- TABLA BITACORA
CREATE table "BITACORA" (
    "ID"          NUMBER(9) NOT NULL,
    "DESCRIPCION" VARCHAR2(500) NOT NULL,
    "FECHA"       DATE DEFAULT (sysdate),
    "USUARIO"     NUMBER(9),
    constraint  "BITACORA_PK" primary key ("ID"),
    CONSTRAINT "BITACORA_USUARIO_FK" FOREIGN KEY ("USUARIO") REFERENCES "USUARIO" ("ID")
);

-- SECUENCIA INCREMENTABLE ID
CREATE sequence "BITACORA_SEQ";

CREATE trigger "BI_BITACORA"  
  before insert on "BITACORA"              
  for each row 
begin  
  if :NEW."ID" is null then
    select "BITACORA_SEQ".nextval into :NEW."ID" from dual;
  end if;
end;

-- TABLA MENSAJE
CREATE table "MENSAJE" (
    "ID"          NUMBER(9) NOT NULL,
    "MENSAJE"     VARCHAR2(500) NOT NULL,
    "FECHA"       DATE DEFAULT (sysdate),
    "USUARIO1"     NUMBER(9),
    "USUARIO2"     NUMBER(9),
    constraint  "MENSAJE_PK" primary key ("ID"),
    CONSTRAINT "MENSAJE_USUARIO1_FK" FOREIGN KEY ("USUARIO1") REFERENCES "USUARIO" ("ID"),
    CONSTRAINT "MENSAJE_USUARIO2_FK" FOREIGN KEY ("USUARIO2") REFERENCES "USUARIO" ("ID")
);

-- SECUENCIA INCREMENTABLE ID
CREATE sequence "MENSAJE_SEQ";

CREATE trigger "BI_MENSAJE"  
  before insert on "MENSAJE"              
  for each row 
begin  
  if :NEW."ID" is null then
    select "MENSAJE_SEQ".nextval into :NEW."ID" from dual;
  end if;
end;