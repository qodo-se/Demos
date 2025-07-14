# Grug-Brained Python to Ruby Migration Plan

## Grug Philosophy Applied
- **Complexity is enemy** - Keep migration simple, no fancy patterns
- **One thing at time** - Migrate piece by piece, not all at once  
- **Make work first** - Get basic functionality working before optimization
- **No big rewrite** - Small steps, test each step

## What Grug See in Current Python Code

### Simple Things (Good):
- Basic CRUD API with 5 endpoints
- In-memory data store (simple list)
- Simple data models (TodoItem, TodoItemCreate, TodoItemUpdate)
- Basic math functions in separate module
- Simple test setup

### Current Structure:
```
boring-todo-api/
├── src/boring_todo_api/
│   ├── main.py          # FastAPI app with CRUD endpoints
│   ├── math/adder.py    # Simple math functions
│   └── tests/           # Basic tests
├── pyproject.toml       # Python dependencies
└── README.md
```

## Grug Migration Strategy: "Make Ruby Do Same Thing"

### Phase 1: Setup Ruby Environment (Day 1)
**Goal: Get Ruby running same as Python**

1. **Create Ruby project structure**
   ```
   boring-todo-api-ruby/
   ├── Gemfile              # Like pyproject.toml
   ├── config.ru            # Rack config
   ├── lib/
   │   ├── app.rb          # Main Sinatra app (like main.py)
   │   └── math/
   │       └── adder.rb    # Math functions
   ├── spec/               # Tests (like tests/)
   └── README.md
   ```

2. **Choose simple Ruby web framework**
   - Use **Sinatra** (not Rails - too complex for grug)
   - Sinatra is like FastAPI - simple, direct, no magic

3. **Basic Gemfile**
   ```ruby
   gem 'sinatra'
   gem 'json'
   gem 'rack-cors'  # For CORS like Python
   gem 'rspec'      # For testing
   ```

### Phase 2: Port Math Module First (Day 1-2)
**Why first: Simple, no web stuff, easy to test**

1. **Create `lib/math/adder.rb`**
   ```ruby
   module Math
     class Adder
       def self.add_two_numbers(a, b)
         a + b
       end
       
       def self.add_three_numbers(a, b, c)
         a + b + c
       end
       
       # ... rest of functions
     end
   end
   ```

2. **Write tests first** (like Python tests)
3. **Make tests pass** - verify math works same

### Phase 3: Port Data Models (Day 2)
**Simple Ruby classes, no fancy ORM**

```ruby
class TodoItem
  attr_accessor :id, :text, :completed
  
  def initialize(id:, text:, completed: false)
    @id = id
    @text = text
    @completed = completed
  end
  
  def to_hash
    { id: @id, text: @text, completed: @completed }
  end
end
```

### Phase 4: Port API Endpoints One by One (Day 2-3)
**Start with GET /items (easiest), end with DELETE (hardest)**

1. **Setup basic Sinatra app**
   ```ruby
   require 'sinatra'
   require 'json'
   
   # In-memory store (same as Python)
   TODO_ITEMS = [
     { id: "1", text: "hello world", completed: false },
     { id: "2", text: "foo bar", completed: false },
     { id: "3", text: "lorem ipsum", completed: false }
   ]
   ```

2. **Port endpoints in order:**
   - `GET /items` → `get '/items'`
   - `GET /items/:id` → `get '/items/:id'`  
   - `POST /items` → `post '/items'`
   - `PUT /items/:id` → `put '/items/:id'`
   - `DELETE /items/:id` → `delete '/items/:id'`

3. **Test each endpoint** before moving to next

### Phase 5: Port Tests (Day 3-4)
**Use RSpec (Ruby's pytest)**

```ruby
require 'rack/test'
require_relative '../lib/app'

RSpec.describe 'Todo API' do
  include Rack::Test::Methods
  
  def app
    Sinatra::Application
  end
  
  it 'lists all items' do
    get '/items'
    expect(last_response.status).to eq(200)
    # ... rest of test
  end
end
```

### Phase 6: Add CORS and Final Polish (Day 4)
**Make Ruby app work with frontend**

1. Add CORS middleware (like Python)
2. Test with actual frontend
3. Fix any small differences

## Grug's Simple File Mapping

| Python File | Ruby File | Notes |
|-------------|-----------|-------|
| `main.py` | `lib/app.rb` | Main web app |
| `math/adder.py` | `lib/math/adder.rb` | Math functions |
| `tests/test_main.py` | `spec/app_spec.rb` | API tests |
| `pyproject.toml` | `Gemfile` | Dependencies |

## Grug's Risk Management

### Low Risk (Do First):
- Math module (no dependencies)
- Data models (simple classes)
- GET endpoints (read-only)

### Medium Risk (Do Carefully):
- POST/PUT endpoints (data modification)
- Error handling (different in Ruby)
- JSON parsing (different syntax)

### High Risk (Do Last):
- CORS setup (framework differences)
- Testing setup (different tools)

## Grug's Success Criteria

### Phase Complete When:
1. **Math module**: All math tests pass in Ruby
2. **Models**: Can create/convert TodoItem objects
3. **Each endpoint**: Returns same JSON as Python version
4. **All tests**: Pass with same assertions
5. **Integration**: Frontend works with Ruby API

### Final Success:
- Ruby API returns identical responses to Python API
- All tests pass
- Frontend connects without changes
- No complex code added

## Grug's Emergency Plan

**If migration gets complex:**
1. **Stop** - complexity is enemy
2. **Go back** to last working state  
3. **Make smaller step** - break current task into smaller pieces
4. **Ask for help** if stuck more than 1 day on single task

**If Ruby seems too different:**
- Consider **Node.js/Express** instead (more similar to Python/FastAPI)
- Or keep Python, just improve deployment/performance

## Timeline Summary

- **Day 1**: Ruby setup + Math module
- **Day 2**: Data models + First 2 endpoints  
- **Day 3**: Remaining endpoints + Basic tests
- **Day 4**: Full test suite + CORS + Integration testing

**Total: 4 days maximum**

## Grug's Final Wisdom

- **Start small** - migrate math module first
- **Test everything** - each small step
- **Keep it simple** - no fancy Ruby patterns
- **Make it work** - optimization comes later
- **One thing at time** - don't rush

Remember: **Working Ruby code better than perfect Python code that doesn't exist yet.**