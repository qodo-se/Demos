PWD_START=$(pwd)
PATH_POETRY_PROJECT=$(pwd)/boring-todo-api
MODEL="gpt-4.1"
DESIRED_COVERAGE=90
MAX_ITERATIONS=5

echo "🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪"
echo "🟪🟪🟪 Qodo Cover Agent 🟪🟪🟪"
echo "🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪"
echo ""

echo "🟪🟪 Configuration"

echo "Target project: $PATH_POETRY_PROJECT"
echo "Model: $MODEL"
echo "Desired coverage: $DESIRED_COVERAGE"
echo "Max iterations: $MAX_ITERATIONS"
echo ""

echo "🟪🟪 Starting Qodo Cover Agent"

cd $PATH_POETRY_PROJECT

PATH_SOURCES=$(pwd)/src/boring_todo_api
PATH_TESTS=$(pwd)/src/boring_todo_api/tests
PATH_COVERAGE_REPORT=$(pwd)/coverage.xml

# loop over .py files in $PATH_SOURCES
for file in $PATH_SOURCES/*.py; do
  # get the filename without the path
  filename=$(basename "$file")
  # get the filename without the extension
  filename_no_ext="${filename%.*}"
  PATH_TEST_FILE="$PATH_TESTS/test_$filename_no_ext.py"
  # create test file if it doesn't exist
  if [ ! -f "$PATH_TEST_FILE" ]; then
  touch "$PATH_TEST_FILE"
  fi
  # run qodo-cover-agent
  cover-agent \
    --model $MODEL \
    --code-coverage-report-path="$PATH_COVERAGE_REPORT" \
    --source-file-path="$file" \
    --test-file-path="$PATH_TEST_FILE" \
    --test-command="poetry run pytest" \
    --desired-coverage $DESIRED_COVERAGE \
    --max-iterations $MAX_ITERATIONS
done

echo ""
echo "🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪"
echo "🟪🟪 Qodo Cover Agent finished"
echo ""

git status

cd $PWD_START