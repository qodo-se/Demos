echo "🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪"
echo "🟪🟪🟪 Qodo Cover Agent 🟪🟪🟪"
echo "🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪"
echo ""

# Die if OPENAI_API_KEY is not set
if [ ! -z "${OPENAI_API_KEY}" ]; then
  continue
else
  echo "🟥🟥🟥 OPENAI_API_KEY required"
  exit 1
fi


PWD_START=$(pwd)
PATH_POETRY_PROJECT=$(pwd)/boring-todo-api
MODEL="gpt-4.1"
DESIRED_COVERAGE=90
MAX_ITERATIONS=5

echo "🟪🟪 Configuration"

echo "Target project: $PATH_POETRY_PROJECT"
echo "Model: $MODEL"
echo "Desired coverage: $DESIRED_COVERAGE"
echo "Max iterations: $MAX_ITERATIONS"
echo ""

echo "🟪🟪 Starting Qodo Cover Agent"
echo ""

cd $PATH_POETRY_PROJECT

PATH_SOURCES=$(pwd)/src/boring_todo_api
PATH_TESTS=$(pwd)/src/boring_todo_api/tests
PATH_COVERAGE_REPORT=$(pwd)/coverage.xml

# recursively find and loop over .py files in $PATH_SOURCES
find "$PATH_SOURCES" -type f -name "*.py" | while read -r file; do
  # get the filename without the path
  filename=$(basename "$file")

  # get the filename without the extension
  filename_no_ext="${filename%.*}"

  # skip __init__.py
  if [ "$filename" == "__init__.py" ]; then
    echo "⏩ Skipping $filename — __init__.py"
    echo ""
    continue
  fi

  # skip if parent directory is tests
  if [[ "$file" == *"/tests/"* ]]; then
    echo "⏩ Skipping $filename — test directory"
    echo ""
    continue
  fi

  # skip if file starts with test_
  if [[ "$filename" == test_* ]]; then
    echo "⏩ Skipping $filename — test file"
    echo ""
    continue
  fi
  
  # get relative path from $PATH_SOURCES
  rel_path=$(dirname "${file#$PATH_SOURCES/}")

  echo "🟪🟪 Reviewing $filename"
  echo ""
  
  # if file is at the root of $PATH_SOURCES, rel_path will be empty
  if [ "$rel_path" = "." ]; then
    rel_path=""
  else
    # ensure the directory exists in the tests folder
    mkdir -p "$PATH_TESTS/$rel_path"
    rel_path="$rel_path/"
  fi

  PATH_TEST_FILE="$PATH_TESTS/${rel_path}test_$filename_no_ext.py"
  
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
    --max-iterations $MAX_ITERATIONS \
    --additional-instructions="Always include docstrings"
done

echo ""
echo "🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪"
echo "🟪🟪 Qodo Cover Agent finished"
echo ""

git status

cd $PWD_START
