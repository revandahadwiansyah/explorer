-- public.folders definition

-- Drop table

-- DROP TABLE public.folders;

CREATE TABLE public.folders (
	id SERIAL PRIMARY KEY,
	"name" varchar NULL,
	levels numeric DEFAULT 0 NULL,
	descriptions text NULL,
    status numeric DEFAULT 0 NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at varchar DEFAULT CURRENT_TIMESTAMP NULL
);
CREATE INDEX folders_created_at_idx ON public.folders USING btree (created_at);
CREATE INDEX folders_levels_idx ON public.folders USING btree (levels);
CREATE INDEX folders_name_idx ON public.folders USING btree (name);
CREATE INDEX folders_status_idx ON public.folders USING btree (status);
CREATE INDEX folders_updated_at_idx ON public.folders USING btree (updated_at);

-- public.files definition

-- Drop table

-- DROP TABLE public.files;

CREATE TABLE public.files (
  id SERIAL PRIMARY KEY,
  name varchar NULL,
  descriptions text NULL,
  folders_id INTEGER NOT NULL,
  status numeric DEFAULT 0 NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_files_folder
    FOREIGN KEY (folders_id)
    REFERENCES public.folders(id)
    ON DELETE CASCADE
);

CREATE INDEX files_created_at_idx ON public.files USING btree (created_at);
CREATE INDEX files_name_idx ON public.files USING btree (name);
CREATE INDEX files_status_idx ON public.files USING btree (status);
CREATE INDEX files_updated_at_idx ON public.files USING btree (updated_at);