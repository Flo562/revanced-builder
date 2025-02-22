// This line is here because of one single issue...
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const {
  QMainWindow,
  QWidget,
  FlexLayout,
  WindowType
} = require('@nodegui/nodegui');
const { preflight } = require('./utils/builder.js');
const { errorScreen, initializeUI, selectApp } = require('./ui/index.js');

const win = new QMainWindow();
win.setWindowTitle('ReVanced Builder');
win.setFixedHeight(400);
win.setFixedWidth(700);

const centralWidget = new QWidget();
centralWidget.setWindowFlag(WindowType.CustomizeWindowHint, true);
centralWidget.setObjectName('background');
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const ui = initializeUI(rootLayout);

process.on('unhandledRejection', async (reason) => {
  errorScreen(reason, ui);
});

(async () => {
  await preflight(false, ui);
  await selectApp(ui);
})();
win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
  #background
  {
    width: ${win.width()}px;
    background-color: #1e1e1e;
    display: flex;
    flex-direction: column;
  }
  
  /*  */
  
  #panel1
  {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    height: ${win.height()};
    padding: 20px;
    background-color: #0f111a;
  }
  
  /* Main content */
  
  
  /* Wrapper for the content */
  
  #panel2 {
    border-radius: 8px;
    height: ${win.height() - 100};
    padding: 8px;
    margin-top:5px;
    background-color: #1b1e29;
    overflow-x: auto;
  }
  
  /* Styles for all unordered lists */
  
  #items {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  /* Styles for all list items */
  
  #item {
    display: flex;
    margin-bottom: 10px;
  }
  
  /* Styles for all input labels */
  
  #itemLabel {
    width:100%;
    font-family: "Araboto";
    font-size: 14px;
    color: #ffffff;
    border-radius: 5px;
    padding:7px;
    background-color: #2a2d3a;
  }
  
  /* Hides multiple choice inputs */
  
  input[type="radio"] {
    display:none;
  }
  
  /* Makes selected list items look selected */
  
  input[type="radio"]:checked + label {
    background: #ff4151;
  }
  
  /* Style for all buttons */
  
  button {
    border: 0;
    border-radius: 5px;
    margin:5px;
    color: #ffffff;
    padding: 7px 14px;
    background-color: #2a2d3a;
  }
  
  /* Make continue button accentColor */
  
  button#continue {
    background-color: #ff4151;
  }
  
  /* Footer for buttons */
  
  #buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #space {
    margin-left: 275px;
  }
  
  /* Darken interactable elements on hover to show that they are clickable */
  
  button:hover, li:hover, img.social--button:hover {
    filter: brightness(95%);
  }
  
  /* Darken interactable elements on mouse-down */
  button:active, li:active, img.social--button:active {
    filter: brightness(85%) !important; /* Usage of !important is only to override the hover */
  }
  
  img.social--button {
    width: 32px;
    height: 32px;
    border-radius: 25px;
    background-color: black;
  }
  QWidget {
    background: transparent;
    color: rgb(255, 255, 255);
    font-size: 17px;
    font-family: "Segoe UI Variable Small", serif;
    font-weight: 400;
}
/*MENU*/
QMenuBar {
    background-color: transparent;
    color: white;
    padding: 10px;
    font-size: 17px;
    font-family: "Segoe UI Variable Small", serif;
    font-weight: 400;
}
QMenuBar::item {
    background-color: transparent;
    padding: 10px 13px;
    margin-left: 5px;
    border-radius: 5px;
}
QMenuBar::item:selected {
    background-color: rgb(255, 255, 255, 20);
}
QMenuBar::item:pressed {
    background-color: rgb(255, 255, 255, 13);
    color: rgb(255, 255, 255, 200);
}
QMenu {
    background-color: transparent;
    padding-left: 1px;
    padding-top: 1px;
    border-radius: 5px;
    border: 1px solid rgb(255, 255, 255, 13);
}
QMenu::item {
    background-color: transparent;
    padding: 5px 15px;
    border-radius: 5px;
    min-width: 60px;
    margin: 3px;
}
QMenu::item:selected {
    background-color: rgb(255, 255, 255, 16);
}
QMenu::item:pressed {
    background-color: rgb(255, 255, 255, 10);
}
QMenu::right-arrow {
    image: url(:/TreeView/img dark/TreeViewClose.png);
    min-width: 40px;
    min-height: 18px;
}
QMenuBar:disabled {
    color: rgb(150, 150, 150);
}
QMenu::item:disabled {
    color: rgb(150, 150, 150);
    background-color: transparent;
}
/*PUSHBUTTON*/
QPushButton {
    background-color: rgb(255, 255, 255, 18);
    border: 1px solid rgb(255, 255, 255, 13);
    border-radius: 7px;
    min-height: 19px;
    max-height: 19px;
    margin-top: 5px;
    padding: 4px;
}
QPushButton:hover {
    background-color: rgb(255, 255, 255, 25);
    border: 1px solid rgb(255, 255, 255, 10);
}
QPushButton::pressed {
    background-color: rgb(255, 255, 255, 7);
    border: 1px solid rgb(255, 255, 255, 13);
    color: rgb(255, 255, 255, 200);
}
QPushButton::disabled {
    color: rgb(150, 150, 150);
    background-color: rgb(255, 255, 255, 13);
}
/*RADIOBUTTON*/
QRadioButton {
    min-height: 30px;
    max-height: 30px;
}
QRadioButton::indicator {
    width: 22px;
    height: 22px;
    border-radius: 13px;
    border: 2px solid #848484;
    background-color: rgb(255, 255, 255, 0);
    margin-right: 5px;
}
QRadioButton::indicator:hover {
    background-color: rgb(255, 255, 255, 16);
}
QRadioButton::indicator:pressed {
    background-color: rgb(255, 255, 255, 20);
    border: 2px solid #434343;
    image: url(:/RadioButton/img dark/RadioButton.png);
}
QRadioButton::indicator:checked {
    background-color: #5fb2f2;
    border: 2px solid #5fb2f2;
    image: url(:/RadioButton/img dark/RadioButton.png);
}
QRadioButton::indicator:checked:hover {
    image: url(:/RadioButton/img dark/RadioButtonHover.png);
}
QRadioButton::indicator:checked:pressed {
    image: url(:/RadioButton/img dark/RadioButtonPressed.png);
}
QRadioButton:disabled {
    color: rgb(150, 150, 150);
}
QRadioButton::indicator:disabled {
    border: 2px solid #646464;
    background-color: rgb(255, 255, 255, 0);
}
/*CHECKBOX*/
QCheckBox {
    min-height: 30px;
    max-height: 30px;
}
QCheckBox::indicator {
    width: 22px;
    height: 22px;
    border-radius: 5px;
    border: 2px solid #848484;
    background-color: rgb(255, 255, 255, 0);
    margin-right: 5px;
}
QCheckBox::indicator:hover {
    background-color: rgb(255, 255, 255, 16);
}
QCheckBox::indicator:pressed {
    background-color: rgb(255, 255, 255, 20);
    border: 2px solid #434343;
}
QCheckBox::indicator:checked {
    background-color: #5fb2f2;
    border: 2px solid #5fb2f2;
    image: url(:/CheckBox/img dark/CheckBox.png);
}
QCheckBox::indicator:checked:pressed {
    image: url(:/CheckBox/img dark/CheckBoxPressed.png);
}
QCheckBox:disabled {
    color: rgb(150, 150, 150);
}
QCheckBox::indicator:disabled {
    border: 2px solid #646464;
    background-color: rgb(255, 255, 255, 0);
}
/*GROUPBOX*/
QGroupBox {
    border-radius: 5px;
    border: 1px solid rgb(255, 255, 255, 13);
    margin-top: 36px;
}
QGroupBox::title {
    subcontrol-origin: margin;
    subcontrol-position: top left;
    background-color: rgb(255, 255, 255, 16);
    padding: 7px 15px;
    margin-left: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
QGroupBox::title::disabled {
    color: rgb(150, 150, 150)
}
/*TABWIDGET*/
QTabWidget {
}
QWidget {
    border-radius: 5px;
}
QTabWidget::pane {
    border: 1px solid rgb(43, 43, 43);
    border-radius: 5px;
}
QTabWidget::tab-bar {
    left: 5px;
}
QTabBar::tab {
    background-color: rgb(255, 255, 255, 0);
    padding: 7px 15px;
    margin-right: 2px;
}
QTabBar::tab:hover {
    background-color: rgb(255, 255, 255, 13);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
QTabBar::tab:selected {
    background-color: rgb(255, 255, 255, 16);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
QTabBar::tab:disabled {
    color: rgb(150, 150, 150)
}
/*SPINBOX*/
QSpinBox {
    background-color: rgb(255, 255, 255, 10);
    border: 1px solid rgb(255, 255, 255, 13);
    border-radius: 5px;
    padding-left: 10px;
    min-height: 38px;
    max-height: 38px;
    min-width: 100px;
    border-bottom: 1px solid rgb(255, 255, 255, 150);
}
QSpinBox:hover {
    background-color: rgb(255, 255, 255, 16);
    border: 1px solid rgb(255, 255, 255, 13);
    border-bottom: 1px solid rgb(255, 255, 255, 150);
}
QSpinBox::focus {
    background-color: rgb(255, 255, 255, 5);
    border: 1px solid rgb(255, 255, 255, 13);
    color: rgb(255, 255, 255, 200);
    border-bottom: 2px solid #5fb2f2;
}
QSpinBox::up-button {
    image: url(:/SpinBox/img dark/SpinBoxUp.png);
    background-color: rgb(0, 0, 0, 0);
    border: 1px solid rgb(0, 0, 0, 0);
    border-radius: 4px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 2px;
    min-width: 30px;
    max-width: 30px;
    min-height: 20px;
}
QSpinBox::up-button:hover {
    background-color: rgb(255, 255, 255, 13);
}
QSpinBox::up-button:pressed {
    background-color: rgb(255, 255, 255, 5);
}
QSpinBox::down-button {
    image: url(:/SpinBox/img dark/SpinBoxDown.png);
    background-color: rgb(0, 0, 0, 0);
    border: 1px solid rgb(0, 0, 0, 0);
    border-radius: 4px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 2px;
    min-width: 30px;
    max-width: 30px;
    min-height: 20px;
}
QSpinBox::down-button:hover {
    background-color: rgb(255, 255, 255, 13);
}
QSpinBox::down-button:pressed {
    background-color: rgb(255, 255, 255, 5);
}
QSpinBox::drop-down {
    background-color: transparent;
    width: 50px;
}
QSpinBox:disabled {
    color: rgb(150, 150, 150);
    background-color: rgb(255, 255, 255, 13);
    border: 1px solid rgb(255, 255, 255, 5);
}
QSpinBox::up-button:disabled {
    image: url(:/SpinBox/img dark/SpinBoxUpDisabled.png);
}
QSpinBox::down-button:disabled {
    image: url(:/SpinBox/img dark/SpinBoxDownDisabled.png);
}
/*DOUBLESPINBOX*/
QDoubleSpinBox {
    background-color: rgb(255, 255, 255, 10);
    border: 1px solid rgb(255, 255, 255, 13);
    border-radius: 5px;
    padding-left: 10px;
    min-height: 38px;
    max-height: 38px;
    min-width: 100px;
    border-bottom: 1px solid rgb(255, 255, 255, 150);
}
QDoubleSpinBox:hover {
    background-color: rgb(255, 255, 255, 16);
    border: 1px solid rgb(255, 255, 255, 13);
    border-bottom: 1px solid rgb(255, 255, 255, 150);
}
QDoubleSpinBox::focus {
    background-color: rgb(255, 255, 255, 5);
    border: 1px solid rgb(255, 255, 255, 13);
    color: rgb(255, 255, 255, 200);
    border-bottom: 2px solid #5fb2f2;
}
QDoubleSpinBox::up-button {
    image: url(:/SpinBox/img dark/SpinBoxUp.png);
    background-color: rgb(0, 0, 0, 0);
    border: 1px solid rgb(0, 0, 0, 0);
    border-radius: 4px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 2px;
    min-width: 30px;
    max-width: 30px;
    min-height: 20px;
}
QDoubleSpinBox::up-button:hover {
    background-color: rgb(255, 255, 255, 13);
}
QDoubleSpinBox::up-button:pressed {
    background-color: rgb(255, 255, 255, 5);
}
QDoubleSpinBox::down-button {
    image: url(:/SpinBox/img dark/SpinBoxDown.png);
    background-color: rgb(0, 0, 0, 0);
    border: 1px solid rgb(0, 0, 0, 0);
    border-radius: 4px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 2px;
    min-width: 30px;
    max-width: 30px;
    min-height: 20px;
}
QDoubleSpinBox::down-button:hover {
    background-color: rgb(255, 255, 255, 13);
}
QDoubleSpinBox::down-button:pressed {
    background-color: rgb(255, 255, 255, 5);
}
QDoubleSpinBox::drop-down {
    background-color: transparent;
    width: 50px;
}
QDoubleSpinBox:disabled {
    color: rgb(150, 150, 150);
    background-color: rgb(255, 255, 255, 13);
    border: 1px solid rgb(255, 255, 255, 5);
}
QDoubleSpinBox::up-button:disabled {
    image: url(:/SpinBox/img dark/SpinBoxUpDisabled.png);
}
QDoubleSpinBox::down-button:disabled {
    image: url(:/SpinBox/img dark/SpinBoxDownDisabled.png);
}
/*DATETIMEEDIT*/
QDateTimeEdit {
    background-color: rgb(255, 255, 255, 10);
    border: 1px solid rgb(255, 255, 255, 13);
    border-radius: 5px;
    padding-left: 10px;
    min-height: 38px;
    max-height: 38px;
    min-width: 100px;
    border-bottom: 1px solid rgb(255, 255, 255, 150);
}
QDateTimeEdit:hover {
    background-color: rgb(255, 255, 255, 16);
    border: 1px solid rgb(255, 255, 255, 13);
    border-bottom: 1px solid rgb(255, 255, 255, 150);
}
QDateTimeEdit::focus {
    background-color: rgb(255, 255, 255, 5);
    border: 1px solid rgb(255, 255, 255, 13);
    color: rgb(255, 255, 255, 200);
    border-bottom: 2px solid #5fb2f2;
}
QDateTimeEdit::up-button {
    image: url(:/SpinBox/img dark/SpinBoxUp.png);
    background-color: rgb(0, 0, 0, 0);
    border: 1px solid rgb(0, 0, 0, 0);
    border-radius: 4px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 2px;
    min-width: 30px;
    max-width: 30px;
    min-height: 20px;
}
QDateTimeEdit::up-button:hover {
    background-color: rgb(255, 255, 255, 13);
}
QDateTimeEdit::up-button:pressed {
    background-color: rgb(255, 255, 255, 5);
}
QDateTimeEdit::down-button {
    image: url(:/SpinBox/img dark/SpinBoxDown.png);
    background-color: rgb(0, 0, 0, 0);
    border: 1px solid rgb(0, 0, 0, 0);
    border-radius: 4px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 2px;
    min-width: 30px;
    max-width: 30px;
    min-height: 20px;
}
QDateTimeEdit::down-button:hover {
    background-color: rgb(255, 255, 255, 13);
}
QDateTimeEdit::down-button:pressed {
    background-color: rgb(255, 255, 255, 5);
}
QDateTimeEdit::drop-down {
    background-color: transparent;
    width: 50px;
}
QDateTimeEdit:disabled {
    color: rgb(150, 150, 150);
    background-color: rgb(255, 255, 255, 13);
    border: 1px solid rgb(255, 255, 255, 5);
}
QDateTimeEdit::up-button:disabled {
    image: url(:/SpinBox/img dark/SpinBoxUpDisabled.png);
}
QDateTimeEdit::down-button:disabled {
    image: url(:/SpinBox/img dark/SpinBoxDownDisabled.png);
}
/*SLIDERVERTICAL*/
QSlider:vertical {
    min-width: 30px;
    min-height: 100px;
}
QSlider::groove:vertical {
    width: 5px; 
    background-color: rgb(255, 255, 255, 150);
    border-radius: 2px;
}
QSlider::handle:vertical {
    background-color: #5fb2f2;
    border: 6px solid #454545;
    height: 13px;
    min-width: 15px;
    margin: 0px -10px;
    border-radius: 12px
}
QSlider::handle:vertical:hover {
    background-color: #5fb2f2;
    border: 4px solid #454545;
    height: 17px;
    min-width: 15px;
    margin: 0px -10px;
    border-radius: 12px
}
QSlider::handle:vertical:pressed {
    background-color: #5fb2f2;
    border: 7px solid #454545;
    height: 11px;
    min-width: 15px;
    margin: 0px -10px;
    border-radius: 12px
}
QSlider::groove:vertical:disabled {
    background-color: rgb(255, 255, 255, 75);
}
QSlider::handle:vertical:disabled {
    background-color: #555555;
    border: 6px solid #353535;
}
/*SLIDERHORIZONTAL*/
QSlider:horizontal {
    min-width: 100px;
    min-height: 30px;
}
QSlider::groove:horizontal {
    height: 5px; 
    background-color: rgb(255, 255, 255, 150);
    border-radius: 2px;
}
QSlider::handle:horizontal {
    background-color: #5fb2f2;
    border: 6px solid #454545;
    width: 13px;
    min-height: 15px;
    margin: -10px 0;
    border-radius: 12px
}
QSlider::handle:horizontal:hover {
    background-color: #5fb2f2;
    border: 4px solid #454545;
    width: 17px;
    min-height: 15px;
    margin: -10px 0;
    border-radius: 12px
}
QSlider::handle:horizontal:pressed {
    background-color: #5fb2f2;
    border: 7px solid #454545;
    width: 11px;
    min-height: 15px;
    margin: -10px 0;
    border-radius: 12px
}
QSlider::groove:horizontal:disabled {
    background-color: rgb(255, 255, 255, 75);
}
QSlider::handle:horizontal:disabled {
    background-color: #555555;
    border: 6px solid #353535;
}
/*PROGRESSBAR*/
QProgressBar {
    background-color: qlineargradient(spread:reflect, x1:0.5, y1:0.5, x2:0.5, y2:1, stop:0.119403 rgba(255, 255, 255, 250), stop:0.273632 rgba(0, 0, 0, 0));
    border-radius: 2px;
    min-height: 4px;
    max-height: 4px;
}
QProgressBar::chunk {
    background-color: #5fb2f2;
    border-radius: 2px;
}
/*COMBOBOX*/
QComboBox {
    background-color: rgb(255, 255, 255, 16);
    border: 1px solid rgb(255, 255, 255, 13);
    border-radius: 5px;
    padding-left: 10px;
    min-height: 38px;
    max-height: 38px;
}
QComboBox:hover {
    background-color: rgb(255, 255, 255, 20);
    border: 1px solid rgb(255, 255, 255, 10);
}
QComboBox::pressed {
    background-color: rgb(255, 255, 255, 20);
    border: 1px solid rgb(255, 255, 255, 13);
    color: rgb(255, 255, 255, 200);
}
QComboBox::down-arrow {
    image: url(:/ComboBox/img dark/ComboBox.png);
}
QComboBox::drop-down {
    background-color: transparent;
    min-width: 50px;
}
QComboBox:disabled {
    color: rgb(150, 150, 150);
    background-color: rgb(255, 255, 255, 13);
    border: 1px solid rgb(255, 255, 255, 5);
}
QComboBox::down-arrow:disabled {
    image: url(:/ComboBox/img dark/ComboBoxDisabled.png);
}
/*LINEEDIT*/
QLineEdit {
    background-color: rgb(255, 255, 255, 16);
    border: 1px solid rgb(255, 255, 255, 13);
    font-size: 16px;
    font-family: "Segoe UI", serif;
    font-weight: 500;
    border-radius: 7px;
    border-bottom: 1px solid rgb(255, 255, 255, 150);
    padding-top: 0px;
    padding-left: 5px;
}
QLineEdit:hover {
    background-color: rgb(255, 255, 255, 20);
    border: 1px solid rgb(255, 255, 255, 10);
    border-bottom: 1px solid rgb(255, 255, 255, 150);
}
QLineEdit:focus {
    border-bottom: 2px solid #5fb2f2;
    background-color: rgb(255, 255, 255, 5);
    border-top: 1px solid rgb(255, 255, 255, 13);
    border-left: 1px solid rgb(255, 255, 255, 13);
    border-right: 1px solid rgb(255, 255, 255, 13);
}
QLineEdit:disabled {
    color: rgb(150, 150, 150);
    background-color: rgb(255, 255, 255, 13);
    border: 1px solid rgb(255, 255, 255, 5);
}
/*SCROLLVERTICAL*/
QScrollBar:vertical {
    border: 6px solid rgb(255, 255, 255, 0);
    margin: 14px 0px 14px 0px;
    width: 16px;
}
QScrollBar:vertical:hover {
    border: 5px solid rgb(255, 255, 255, 0);
}
QScrollBar::handle:vertical {
    background-color: rgb(255, 255, 255, 130);
    border-radius: 2px;
    min-height: 25px;
}
QScrollBar::sub-line:vertical {
    image: url(:/ScrollVertical/img dark/ScrollTop.png);
    subcontrol-position: top;
    subcontrol-origin: margin;
}
QScrollBar::sub-line:vertical:hover {
    image: url(:/ScrollVertical/img dark/ScrollTopHover.png);
}
QScrollBar::sub-line:vertical:pressed {
    image: url(:/ScrollVertical/img dark/ScrollTopPressed.png);
}
QScrollBar::add-line:vertical {
    image: url(:/ScrollVertical/img dark/ScrollBottom.png);
    subcontrol-position: bottom;
    subcontrol-origin: margin;
}
QScrollBar::add-line:vertical:hover {
    image: url(:/ScrollVertical/img dark/ScrollBottomHover.png);
}
QScrollBar::add-line:vertical:pressed {
    image: url(:/ScrollVertical/img dark/ScrollBottomPressed.png);
}
QScrollBar::add-page:vertical, QScrollBar::sub-page:vertical {
    background: none;
}
/*SCROLLHORIZONTAL*/
QScrollBar:horizontal {
    border: 6px solid rgb(255, 255, 255, 0);
    margin: 0px 14px 0px 14px;
    height: 16px;
}
QScrollBar:horizontal:hover {
    border: 5px solid rgb(255, 255, 255, 0);
    height: 16px;
}
QScrollBar::handle:horizontal {
    background-color: rgb(255, 255, 255, 130);
    height: 16px;
}
QScrollBar::sub-line:horizontal {
    image: url(:/ScrollHorizontal/img dark/ScrollLeft.png);
}
QScrollBar::sub-line:horizontal:hover {
    image: url(:/ScrollHorizontal/img dark/ScrollLeftHover.png);
}
QScrollBar::sub-line:horizontal:pressed {
    image: url(:/ScrollHorizontal/img dark/ScrollLeftPressed.png);
}
QScrollBar::add-line:horizontal {
    image: url(:/ScrollHorizontal/img dark/ScrollRight.png);
}
QScrollBar::add-line:horizontal:hover {
    image: url(:/ScrollHorizontal/img dark/ScrollRightHover.png);
}
QScrollBar::add-line:horizontal:pressed {
    image: url(:/ScrollHorizontal/img dark/ScrollRightPressed.png);
}
QScrollBar::add-page:horizontal, QScrollBar::sub-page:horizontal {
    background: none;
}
/*TEXTEDIT*/
QTextEdit {
    background-color: rgb(255, 255, 255, 16);
    border: 1px solid rgb(255, 255, 255, 13);
    font-size: 16px;
    font-family: "Segoe UI", serif;
    font-weight: 500;
    border-radius: 7px;
    border-bottom: 1px solid rgb(255, 255, 255, 150);
    width: 735;
    height: 300;
}
QTextEdit:hover {
    background-color: rgb(255, 255, 255, 20);
    border: 1px solid rgb(255, 255, 255, 10);
    border-bottom: 1px solid rgb(255, 255, 255, 150);
}
QTextEdit:focus {
    border-bottom: 2px solid #5fb2f2;
    background-color: rgb(255, 255, 255, 5);
    border-top: 1px solid rgb(255, 255, 255, 13);
    border-left: 1px solid rgb(255, 255, 255, 13);
    border-right: 1px solid rgb(255, 255, 255, 13);
}
QTextEdit:disabled {
    color: rgb(150, 150, 150);
    background-color: rgb(255, 255, 255, 13);
    border: 1px solid rgb(255, 255, 255, 5);
}
/*CALENDAR*/
QCalendarWidget {
}
QCalendarWidget QToolButton {
    height: 36px;
    font-size: 18px;
    background-color: rgb(255, 255, 255, 0);
    margin: 5px;
}
QCalendarWidget QWidget#qt_calendar_navigationbar { 
    background-color: rgb(255, 255, 255, 0); 
    border: 1px solid rgb(255, 255, 255, 13);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom: none;
}
#qt_calendar_prevmonth {
    qproperty-icon: url(:/PrevNext/img dark/PrevMonth.png);
    width: 32px;
}
#qt_calendar_nextmonth {
    qproperty-icon: url(:/PrevNext/img dark/NextMonth.png);
    width: 32px;
}
#qt_calendar_prevmonth:hover, #qt_calendar_nextmonth:hover {
    background-color: rgb(255, 255, 255, 16);
    border-radius: 5px;
}
#qt_calendar_prevmonth:pressed, #qt_calendar_nextmonth:pressed {
    background-color: rgb(255, 255, 255, 10);
    border-radius: 5px;
}
#qt_calendar_yearbutton, #qt_calendar_monthbutton {
    color: white;
    margin: 5px 0px;
    padding: 0px 10px;
}
#qt_calendar_yearbutton:hover, #qt_calendar_monthbutton:hover {
    background-color: rgb(255, 255, 255, 16);
    border-radius: 5px;
}
#qt_calendar_yearbutton:pressed, #qt_calendar_monthbutton:pressed {
    background-color: rgb(255, 255, 255, 10);
    border-radius: 5px;
}
QCalendarWidget QToolButton::menu-indicator#qt_calendar_monthbutton {
    background-color: transparent;
}
QCalendarWidget QMenu {
    background-color : #202020;
}
QCalendarWidget QSpinBox {
    margin: 5px 0px;
}
QCalendarWidget QSpinBox::focus {
    background-color: rgb(255, 255, 255, 5);
    border: 1px solid rgb(255, 255, 255, 13);
    color: rgb(0, 0, 0, 200);
    border-bottom: 2px solid #5fb2f2;
}
QCalendarWidget QSpinBox::up-button {
    image: url(:/SpinBox/img dark/SpinBoxUp.png);
    background-color: rgb(0, 0, 0, 0);
    border: 1px solid rgb(0, 0, 0, 0);
    border-radius: 4px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 2px;
    min-width: 30px;
    max-width: 30px;
    min-height: 20px;
}
QCalendarWidget QSpinBox::up-button:hover {
    background-color: rgb(255, 255, 255, 13);
}
QCalendarWidget QSpinBox::up-button:pressed {
    background-color: rgb(255, 255, 255, 5);
}
QCalendarWidget QSpinBox::down-button {
    image: url(:/SpinBox/img dark/SpinBoxDown.png);
    background-color: rgb(0, 0, 0, 0);
    border: 1px solid rgb(0, 0, 0, 0);
    border-radius: 4px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 2px;
    min-width: 30px;
    max-width: 30px;
    min-height: 20px;
}
QCalendarWidget QSpinBox::down-button:hover {
    background-color: rgb(255, 255, 255, 13);
}
QCalendarWidget QSpinBox::down-button:pressed {
    background-color: rgb(255, 255, 255, 5);
}
QCalendarWidget QWidget { 
    alternate-background-color: rgb(255, 255, 255, 0); 
}
QCalendarWidget QAbstractItemView:enabled {
    color: rgb(255, 255, 255);  
    selection-background-color: #5fb2f2;
    selection-color: black;
    border: 1px solid rgb(255, 255, 255, 13);
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    outline: 0;
}
QCalendarWidget QAbstractItemView:disabled {
    color: rgb(150, 150, 150);  
    selection-background-color: rgb(150, 150, 150);
    selection-color: black;
    border: 1px solid rgb(255, 255, 255, 13);
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
#qt_calendar_yearbutton:disabled, #qt_calendar_monthbutton:disabled {
    color: rgb(150, 150, 150);
}
#qt_calendar_prevmonth:disabled {
    qproperty-icon: url(:/PrevNext/img dark/PrevMonthDisabled.png);
}
#qt_calendar_nextmonth:disabled {
    qproperty-icon: url(:/PrevNext/img dark/NextMonthDisabled.png);
}
/*TREEWIDGET*/
QTreeView {
    background-color: transparent;
    border: 1px solid rgb(255, 255, 255, 13);
    border-radius: 5px;
    outline: 0;
    padding-right: 5px;
}
QTreeView::item {
    padding: 7px;
    margin-top: 3px;
}
QTreeView::item:selected {
    color: white;
    background-color: rgb(255, 255, 255, 13);
    border-radius: 5px;
    margin-bottom: 3px;
    padding-left: 0px;
}
QTreeView::item:!selected:hover {
    background-color: rgb(255, 255, 255, 16);
    border-radius: 5px;
    margin-bottom: 3px;
    padding-left: 0px;
}
QTreeView::branch:has-children:!has-siblings:closed,
QTreeView::branch:closed:has-children:has-siblings {
    image: url(:/TreeView/img dark/TreeViewClose.png);
}
QTreeView::branch:open:has-children:!has-siblings,
QTreeView::branch:open:has-children:has-siblings {
    image: url(:/TreeView/img dark/TreeViewOpen.png);
}
QTreeView:disabled {
    color: rgb(150, 150, 150);
}
/*TOGGLESWITCH*/
#toggleSwitch {
    color: rgb(255, 255, 255);
    font-size: 17px;
    font-family: "Segoe UI Variable Small", serif;
    font-weight: 400;
}
#toggleSwitch::indicator {
    width: 22px;
    height: 22px;
    border-radius: 13px;
    border: 2px solid #848484;
    background-color: rgb(255, 255, 255, 0);
    image: url(:/ToggleSwitch/img dark/ToggleSwitchOff.png);
    margin-right: 5px;
    padding-right: 25px;
    padding-left: 0px;
}
#toggleSwitch::indicator:hover {
    background-color: rgb(255, 255, 255, 13);
    image: url(:/ToggleSwitch/img dark/ToggleSwitchOffHover.png);
}
#toggleSwitch::indicator:pressed {
    background-color: rgb(255, 255, 255, 20);
    width: 26px;
    padding-right: 21px;
    image: url(:/ToggleSwitch/img dark/ToggleSwitchOffPressed.png);
}
#toggleSwitch::indicator:checked {
    background-color: #5fb2f2;
    border: 2px solid #5fb2f2;
    image: url(:/ToggleSwitch/img dark/ToggleSwitchOn.png);
    padding-left: 25px;
    padding-right: 0px;
}
#toggleSwitch::indicator:checked:hover {
    background-color: #5fb2f2;
    image: url(:/ToggleSwitch/img dark/ToggleSwitchOnHover.png);
}
#toggleSwitch::indicator:checked:pressed {
    background-color: #5fb2f2;
    width: 26px;
    padding-left: 21px;
    image: url(:/ToggleSwitch/img dark/ToggleSwitchOnPressed.png);
}
#toggleSwitch:disabled {
    color: rgb(150, 150, 150);
}
#toggleSwitch::indicator:disabled {
    border: 2px solid #646464;
    background-color: rgb(255, 255, 255, 0);
    image: url(:/ToggleSwitch/img dark/ToggleSwitchDisabled.png);
}
/*HYPERLINKBUTTON*/
#hyperlinkButton {
    color: #5fb2f2;
    font-size: 17px;
    font-family: "Segoe UI Variable Small", serif;
    border-radius: 5px;
    background-color: rgb(255, 255, 255, 0);
    border: none;
}
#hyperlinkButton:hover {
    background-color: rgb(255, 255, 255, 20);
}
#hyperlinkButton::pressed {
    background-color: rgb(255, 255, 255, 15);
    color: #5fb2f2;
}
#hyperlinkButton:disabled {
    color: rgb(150, 150, 150)
}
/*LISTVIEW*/
QListView {
    background-color: transparent;
    font-size: 17px;
    font-family: "Segoe UI Variable Small", serif;
    font-weight: 400;
    padding: 7px;
    border-radius: 10px;
    outline: 0;
}
QListView::item {
    height: 35px;
}
QListView::item:selected {
    background-color: #5fb2f2;
    color: white;
    border-radius: 5px;
    padding-left: 0px;
}

  `
);

win.show();
global.win = win;
global.layout = rootLayout;
