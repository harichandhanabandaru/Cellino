-- Run in "run_db"

-- This will default the values to the given values
-- All reviewers for run and plate records are defaulted to CATHERINE_ID

-- Existing Run Owner ID is defaulted to MARIA_ID

DO $$
	DECLARE MARIA_ID uuid := '';
	DECLARE CATHERINE_ID uuid := '';
	DECLARE BAR_ID uuid := '';

	BEGIN
	
		-- Update Run Owner
		
		UPDATE public."run" SET run_owner_id = MARIA_ID;
	
		-- Run Reviewers
	
		INSERT INTO public."run_reviewers"
		SELECT id, BAR_ID from public."run";
		
		-- Plate Reviewers
		
		INSERT INTO public."plate_reviewers"
		SELECT id, CATHERINE_ID from public."plate";
		
	END$$
	