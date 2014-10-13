# $ext_path: This should be the path of the Ext JS SDK relative to this file
$ext_path = File.join('..', '..', '..', 'lib', 'extjs-4.1.1')
# This should be based on the path from where the generated CSS file resides to the root of the
# theme content.
# CSS will be generated in ext4/myRetirement/resources/css/default.
# Custom themes root is ext4/extjs-4.1.1
$ext_themes_path = File.join('..', '..', '..', '..', 'extjs-4.1.1')

# sass_path: the directory your Sass files are in. THIS file should also be in the Sass folder
# Generally this will be in a resources/sass folder
# <root>/resources/sass
sass_path = File.join(File.dirname(__FILE__), "sass")
project_path = "."

# css_path: the directory you want your CSS files to be.
# Generally this is a folder in the parent directory of your Sass files
# <root>/resources/css
css_path = File.join("css")
images_dir = File.join("images", "default")

http_path = ".."
relative_assets = true

# output_style: The output style for your compiled CSS
# nested, expanded, compact, compressed
# More information can be found here http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#output_style

if environment == :production
  output_style = :compressed
  line_comments = false
end

if environment == :developemnt
  output_style = :nested
  line_comments = false
  debug_info = true
end

if environment == :development
  output_style = :nested
  line_comments = false
  debug_info = true
end

# We need to load in the Ext4 themes folder, which includes all it's default styling, images, variables and mixins
load File.join(File.dirname(__FILE__), $ext_path, 'resources', 'themes')
