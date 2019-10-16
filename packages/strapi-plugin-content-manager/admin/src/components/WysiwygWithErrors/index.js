import React from 'react';
import PropTypes from 'prop-types';

import Editor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import CKEditor from '@ckeditor/ckeditor5-react';
import styles from './styles.scss';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

// basic styles
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
// import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
// import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
// import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';

// font
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';

// table
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

// image
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageTextAlternative from '@ckeditor/ckeditor5-image/src/imagetextalternative';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';

import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

class Wysiwyg extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props);
  }

  render() {
    const onChange = (event, editor) => {
      this.props.onChange({
        target: {
          name: this.props.name,
          type: this.props.type,
          value: editor.getData(),
        },
      });
    };

    const jwtToken =
      sessionStorage.getItem('jwtToken').replace(/"/g, '') ||
      localStorage.getItem('jwtToken').replace(/"/g, '') ||
      '';
    const editorConfiguration = {
      plugins: [
        FileRepository,
        SimpleUploadAdapter,
        Essentials,
        Paragraph,
        Bold,
        Italic,
        FontColor,
        Underline,
        Strikethrough,
        Image,
        ImageToolbar,
        ImageStyle,
        ImageTextAlternative,
        ImageResize,
        ImageUpload,
        Table,
        TableToolbar,
      ],
      toolbar: [
        'Undo',
        'Redo',
        '|',
        'Bold',
        'Italic',
        'FontColor',
        '|',
        'Underline',
        'Strikethrough',
        '|',
        'insertTable',
        '|',
        'ImageUpload',
      ],
      image: {
        styles: ['full', 'alignLeft', 'alignRight'],
        toolbar: [
          'imageTextAlternative',
          '|',
          'imageStyle:alignLeft',
          'imageStyle:full',
          'imageStyle:alignRight',
        ],
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
      simpleUpload: {
        uploadUrl: '/upload',
        headers: {
          'X-CSRF-TOKEN': 'CSFR-Token',
          Authorization: `Bearer ${jwtToken}`,
        },
      },
      // plugins: [ Essentials, Bold, Italic ],
      // extraPlugins: [ Code ],
      // toolbar: {
      //   items: [
      //     'heading', 'bulletedList', 'numberedList', 'fontFamily', 'undo', 'redo', '|', 'code', 'TextColor', 'highlight',
      //     '/',
      //     'bold', 'italic',
      //   ]
      // }
      // plugins: [ Code ],
      // toolbar: [
      //   { name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
      //   { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
      //   { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
      //   { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
      //   '/',
      //   { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
      //   { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
      //   { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
      //   { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
      //   '/',
      //   { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
      //   { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
      //   { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
      //   { name: 'about', items: [ 'About' ] }
      // ],
      // removeButtons: 'NewPage,Print,Preview,Templates,Save,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Form,CreateDiv,Language,Anchor,Flash,Smiley,PageBreak,Iframe,About'
    };

    return (
      <div className={styles.richTextEditorContainer}>
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={this.props.value}
          onChange={onChange}
          ref={this.props.setRef}
        />
      </div>
    );
  }
}

Wysiwyg.defaultProps = {
  setRef: () => {},
  onChange: () => {},
  name: '',
  type: '',
  value: '',
};

Wysiwyg.propTypes = {
  setRef: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Wysiwyg;
