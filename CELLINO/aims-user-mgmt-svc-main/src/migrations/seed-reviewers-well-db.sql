-- Run in "well_db"

-- This will default the values to the given values
-- All reviewers for well records are defaulted to CATHERINE_ID

DO $$
	
	DECLARE CATHERINE_ID uuid := '';

	BEGIN
	
		-- Well Reviewers
		
		INSERT INTO public."well_reviewers"
		SELECT id, CATHERINE_ID from public."well";
		
	END$$
	