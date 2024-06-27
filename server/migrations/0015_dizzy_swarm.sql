ALTER TABLE "orderProduct" ADD COLUMN "orderID" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_orderID_oders_id_fk" FOREIGN KEY ("orderID") REFERENCES "public"."oders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
