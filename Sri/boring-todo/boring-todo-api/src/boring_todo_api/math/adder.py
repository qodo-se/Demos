def add_two_numbers(a, b):
    return a + b


def add_three_numbers(a, b, c):
    return a + b + c


def subtract_two_numbers(a, b):
    return add_two_numbers(a, -b)


def subtract_three_numbers(a, b, c):
    return add_three_numbers(a, b, -c)


def add_four_numbers(a, b, c, d):
    return add_three_numbers(a, b, c) + d


def add_five_numbers(a, b, c, d, e):
    return add_four_numbers(a, b, c, d) + e
