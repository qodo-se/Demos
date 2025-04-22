

def test_subtract_three_numbers_basic():
    """Test subtract_three_numbers with three integers."""
    from boring_todo_api.math.adder import subtract_three_numbers
    assert subtract_three_numbers(10, 5, 3) == 12


def test_subtract_two_numbers_basic():
    """Test subtract_two_numbers with two integers."""
    from boring_todo_api.math.adder import subtract_two_numbers
    assert subtract_two_numbers(7, 4) == 3


def test_add_three_numbers_with_negative():
    """Test add_three_numbers with two positives and one negative number."""
    from boring_todo_api.math.adder import add_three_numbers
    assert add_three_numbers(10, -2, 4) == 12


def test_add_two_numbers_positive_integers():
    """Test add_two_numbers with two positive integers."""
    from boring_todo_api.math.adder import add_two_numbers
    assert add_two_numbers(3, 5) == 8
