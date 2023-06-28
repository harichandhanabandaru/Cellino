import { MigrationInterface, QueryRunner } from "typeorm";

export class runMetricTriggerMigration1663677568979 implements MigrationInterface {
    name = 'runMetricTriggerMigration1663677568979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        create or replace function active_plate_change()
        returns trigger as 
        $BODY$
        begin
        if NEW.process_status not in (5,6) and (OLD.process_status > 4 or OLD.process_status is null) and NEW.id = (select id from plate_event group by plate_id, id, created_at order by created_at desc limit 1) then
        update run_metric set active_plates_count = (select active_plates_count from run_metric where run_id = (select run_id from plate where id = NEW.plate_id))+1 where run_id = (select run_id from plate where id = NEW.plate_id);
        else if NEW.process_status in (5,6) and (OLD.process_status < 5 or OLD.process_status is null) and NEW.id = (select id from plate_event group by plate_id, id, created_at order by created_at desc limit 1) then
        update run_metric set active_plates_count = (select active_plates_count from run_metric where run_id = (select run_id from plate where id = NEW.plate_id))-1 where run_id = (select run_id from plate where id = NEW.plate_id);
        end if;
        end if;
        return new;
        end;
        $BODY$
        language plpgsql;
        `);
        await queryRunner.query(`
        create trigger run_metric_trigger
        after update
        on plate_event 
        for each row
        execute procedure active_plate_change();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop trigger "run_metric_trigger" on "plate_event"
        `);
        await queryRunner.query(`
            drop function "active_plate_change" 
        `);
    }

}
