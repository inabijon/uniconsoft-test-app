import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes-widget',
  imports: [FormsModule],
  templateUrl: './notes-widget.component.html',
  styleUrl: './notes-widget.component.css',
})
export class NotesWidgetComponent {
  @ViewChild('editableDiv') editableDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  noteContent: string = '';
  isPlaceholderVisible: boolean = true;
  isBoldActive: boolean = false;
  isOrderedListActive: boolean = false;

  onContentChange(event: any) {
    const textContent = event.target.textContent || '';
    const htmlContent = event.target.innerHTML || '';

    this.noteContent = htmlContent;
    this.isPlaceholderVisible = textContent.trim() === '' && htmlContent.trim() === '';
    this.updateButtonStates();

    // Cursor pozitsiyasini saqlash
    this.saveCursorPosition();
  }

  onFocus() {
    this.isPlaceholderVisible = false;
    // Focus qilganda cursor oxiriga o'tkazish
    setTimeout(() => {
      this.setCursorToEnd();
    }, 0);
  }

  onBlur() {
    const textContent = this.editableDiv?.nativeElement?.textContent || '';
    const htmlContent = this.editableDiv?.nativeElement?.innerHTML || '';
    this.isPlaceholderVisible = textContent.trim() === '' && htmlContent.trim() === '';
  }

  toggleBold() {
    document.execCommand('bold', false);
    this.updateButtonStates();
  }

  toggleOrderedList() {
    document.execCommand('insertOrderedList', false);
    this.updateButtonStates();
  }

  triggerImageUpload() {
    this.imageInput.nativeElement.click();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = `<img src="${e.target.result}" style="max-width: 100%; height: auto; margin: 10px 0; display: block;" />`;
        this.insertHTMLAtCursor(img);
      };
      reader.readAsDataURL(file);
    }
  }

  insertHTMLAtCursor(html: string) {
    // Focus on the editable div first
    this.editableDiv.nativeElement.focus();

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();

      const div = document.createElement('div');
      div.innerHTML = html;
      div.style.direction = 'ltr';
      div.style.textAlign = 'left';
      div.style.unicodeBidi = 'normal';

      const fragment = document.createDocumentFragment();

      let node;
      while ((node = div.firstChild)) {
        fragment.appendChild(node);
      }

      range.insertNode(fragment);

      // Move cursor after inserted content
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      // If no selection, append to the end
      const newElement = document.createElement('div');
      newElement.innerHTML = html;
      newElement.style.direction = 'ltr';
      newElement.style.textAlign = 'left';
      this.editableDiv.nativeElement.appendChild(newElement);
      this.setCursorToEnd();
    }

    this.updateContent();
  }

  updateContent() {
    if (this.editableDiv) {
      this.noteContent = this.editableDiv.nativeElement.innerHTML;
      this.isPlaceholderVisible = !this.noteContent.trim();
      // Content o'zgarganda cursor pozitsiyasini saqlash
      setTimeout(() => {
        this.setCursorToEnd();
      }, 0);
    }
  }

  updateButtonStates() {
    // Check if current selection is bold
    this.isBoldActive = document.queryCommandState('bold');

    // Check if current selection is in ordered list
    this.isOrderedListActive = document.queryCommandState('insertOrderedList');
  }

  // Cursor pozitsiyasini oxiriga o'tkazish
  setCursorToEnd() {
    if (this.editableDiv && this.editableDiv.nativeElement) {
      const element = this.editableDiv.nativeElement;
      element.focus();

      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false); // false - oxiriga o'tkazish
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  // Cursor pozitsiyasini saqlash
  saveCursorPosition() {
    // Bu metodda kerak bo'lsa cursor pozitsiyasini saqlash mumkin
    // Hozircha bo'sh qoldiramiz
  }

  clearAll() {
    this.noteContent = '';
    this.isPlaceholderVisible = true;
    this.isBoldActive = false;
    this.isOrderedListActive = false;

    if (this.editableDiv) {
      this.editableDiv.nativeElement.innerHTML = '';
      // Tozalagandan so'ng cursor boshiga o'rnatish
      setTimeout(() => {
        this.editableDiv.nativeElement.focus();
      }, 0);
    }

    // Clear file input
    if (this.imageInput) {
      this.imageInput.nativeElement.value = '';
    }
  }

  saveNote() {
    // Bu yerda saqlash funksiyasini yozishingiz mumkin
    console.log('Note saved:', this.noteContent);
    alert('Note saved successfully!');
  }
}
