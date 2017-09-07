from HtmlParser import HtmlParser
from Converter import Converter

if __name__ == "__main__":
    parser = HtmlParser()
    converter = Converter()

    py_obj = parser.parse_to_py()
    converter.py_Chat_to_json(py_obj)
