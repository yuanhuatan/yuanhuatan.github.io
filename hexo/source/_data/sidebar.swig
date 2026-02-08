{%- if site.posts.length > 0 %}
<div class="links-of-blogroll motion-element" style="margin-top: 16px;">
  <div class="links-of-blogroll-title">
    <i class="fa fa-fw fa-list"></i>
    文章清单
  </div>
  <ul class="links-of-blogroll-list">
    {%- for post in site.posts.toArray() %}
    <li class="links-of-blogroll-item">
      <a href="{{ url_for(post.path) }}" title="{{ post.title }}" rel="bookmark">{{ post.title or __('post.untitled') }}</a>
    </li>
    {%- endfor %}
  </ul>
</div>
{%- endif %}
