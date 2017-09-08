from ChatChooserUI import ChatChooserUI
from ChartGenerator import ChartGenerator

if __name__ == "__main__":
    chatUi = ChatChooserUI()
    chat_file = chatUi.choose_chat()

    chart_generator = ChartGenerator(chat_file)
    chart_generator.generate_chart_stats()

    
    
