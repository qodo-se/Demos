cd boring-todo-api

cover-agent \
  --model "gpt-4.1" \
  --code-coverage-report-path="./coverage.xml" \
  --source-file-path=./src/boring_todo_api/main.py \
  --test-file-path=./src/boring_todo_api/tests/test_main.py \
  --test-command="poetry run pytest" \
  --desired-coverage 90 \
  --max-iterations 5
  #--additional-instructions="add tests to the class 'TestUnitTestGenerator'"